const STORAGE_KEY = "menu_reminders";

export function getReminders() {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export function addReminder(item) {
  const reminders = getReminders();
  const existingIndex = reminders.findIndex(r => r.id === item.id);

  if (existingIndex !== -1) {
    reminders[existingIndex].quantity =
      (reminders[existingIndex].quantity || 1) + 1;
  } else {
    reminders.push({ ...item, quantity: 1 });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export function removeReminder(id) {
  let reminders = getReminders();
  const existingIndex = reminders.findIndex(r => r.id === id);

  if (existingIndex !== -1) {
    if (reminders[existingIndex].quantity > 1) {
      reminders[existingIndex].quantity -= 1;
    } else {
      reminders = reminders.filter(r => r.id !== id);
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}
