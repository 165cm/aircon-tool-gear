export function trackAmazonClick({ itemId, itemName, pageType, linkPosition }) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "outbound_click_amazon",
    item_id: itemId,
    item_name: itemName,
    page_type: pageType,
    link_position: linkPosition,
  });
}
