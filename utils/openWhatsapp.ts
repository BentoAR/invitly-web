export const openWhatsApp = (message: string) => {
  const phoneNumber = "541157572713";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank");
};
