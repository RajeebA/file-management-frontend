export function getUser() {
  const User = localStorage.getItem("user");
  return User ? JSON.parse(User) : null;
}
