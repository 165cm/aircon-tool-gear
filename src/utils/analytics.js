export function trackAmazonClick({ itemId, itemName, pageType, linkPosition }) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "outbound_click_amazon", {
    item_id: itemId,
    item_name: itemName,
    page_type: pageType,
    link_position: linkPosition,
  });
}
