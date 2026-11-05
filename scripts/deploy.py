import sys
import os
import zipfile
import urllib.request
import ssl
import base64
import uuid
import json

# Ensure UTF-8
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

def create_update_zip(source_dir, output_zip):
    print(f"Creating optimized {output_zip}...")
    with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                # Exclude large static media already present on the server
                if file.endswith((".png", ".webp", ".mkv", ".ico")):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                z.write(full_path, rel_path)
    print(f"Created {output_zip} ({os.path.getsize(output_zip)} bytes).")

def deploy():
    out_dir = os.path.abspath("out")
    out_zip = os.path.abspath("update.zip")
    create_update_zip(out_dir, out_zip)

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    auth = base64.b64encode(b"h443608:1RR3hPUmyAlVsE").decode()

    # 1. Upload update.zip via cPanel API
    print("Uploading update.zip to public_html...")
    with open(out_zip, "rb") as f:
        zip_bytes = f.read()

    boundary = uuid.uuid4().hex
    part1 = (
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"dir\"\r\n\r\npublic_html\r\n"
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"overwrite\"\r\n\r\n1\r\n"
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"file-1\"; filename=\"update.zip\"\r\nContent-Type: application/zip\r\n\r\n"
    ).encode("utf-8")
    part2 = b"\r\n--" + boundary.encode("utf-8") + b"--\r\n"
    body = part1 + zip_bytes + part2

    api_url = "https://146.19.212.122:2083/execute/Fileman/upload_files"
    req = urllib.request.Request(
        api_url,
        data=body,
        headers={
            "Host": "chill-burger.ir",
            "Authorization": f"Basic {auth}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
            "Content-Length": str(len(body)),
        }
    )
    with urllib.request.urlopen(req, context=ctx, timeout=120) as r:
        res = json.loads(r.read().decode())
        print("update.zip upload status:", res.get("status"), "succeeded:", res.get("data", {}).get("succeeded"))

    # 2. Upload unzip.php
    print("Uploading unzip.php...")
    php_code = """<?php
header('Content-Type: text/plain');
if (!file_exists('update.zip')) {
    die('NO_ZIP');
}
$zip = new ZipArchive();
if ($zip->open('update.zip') === TRUE) {
    $zip->extractTo(__DIR__);
    $zip->close();
    unlink('update.zip');
    unlink(__FILE__);
    echo 'EXTRACT_SUCCESS';
} else {
    echo 'EXTRACT_FAIL';
}
?>"""
    b_php = uuid.uuid4().hex
    p1 = (
        f"--{b_php}\r\nContent-Disposition: form-data; name=\"dir\"\r\n\r\npublic_html\r\n"
        f"--{b_php}\r\nContent-Disposition: form-data; name=\"overwrite\"\r\n\r\n1\r\n"
        f"--{b_php}\r\nContent-Disposition: form-data; name=\"file-1\"; filename=\"unzip.php\"\r\nContent-Type: text/plain\r\n\r\n"
    ).encode("utf-8")
    p2 = b"\r\n--" + b_php.encode("utf-8") + b"--\r\n"
    body_php = p1 + php_code.encode("utf-8") + p2

    req_php_upload = urllib.request.Request(
        api_url,
        data=body_php,
        headers={
            "Host": "chill-burger.ir",
            "Authorization": f"Basic {auth}",
            "Content-Type": f"multipart/form-data; boundary={b_php}",
            "Content-Length": str(len(body_php)),
        }
    )
    with urllib.request.urlopen(req_php_upload, context=ctx, timeout=30) as r:
        print("Uploaded unzip.php status:", r.status)

    # 3. Trigger unzip.php
    print("Triggering extraction on live server...")
    ctx_ssl = ssl.create_default_context()
    req_trigger = urllib.request.Request("https://chill-burger.ir/unzip.php", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req_trigger, context=ctx_ssl, timeout=30) as r:
        result = r.read().decode()
        print("Extraction response:", result)

if __name__ == "__main__":
    deploy()
