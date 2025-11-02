export const clientSignOut = () => {
  window.document.cookie =
    "interbanc_access_token=; Max-Age=0; path=/; secure; SameSite=Lax";

  window.location.href = "/";
};
