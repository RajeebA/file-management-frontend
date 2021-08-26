import request from "./request";

export function postSignInAPI(payload) {
  return request.post("auth/login", payload);
}
export function postSignUpAPI(payload) {
  return request.post("auth/register", payload);
}
export function getAllFilesAPI() {
  return request.get("storage/files");
}
export function uploadFileAPI(payload) {
  return request.post("storage/upload", payload);
}
