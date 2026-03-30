const fs = require('fs');
const path = require('path');

const files = [
  "src/components/StatsStrip.tsx",
  "src/components/shop/ShopSearchBar.tsx",
  "src/components/shop/ShopFilters.tsx",
  "src/components/shop/MobileFilterDrawer.tsx",
  "src/components/shop/ProductCard.tsx",
  "src/components/shop/AddToCartSection.tsx",
  "src/components/ExecutionProcess.tsx",
  "src/components/cart/CartDrawer.tsx",
  "src/app/shop/[slug]/page.tsx",
  "src/app/shop/page.tsx",
  "src/app/order/confirmation/[orderId]/page.tsx",
  "src/app/login/page.tsx",
  "src/app/account/AccountClient.tsx",
  "src/app/checkout/page.tsx",
  "src/app/cart/page.tsx",
  "src/components/GetQuoteModal.tsx",
  "src/app/globals.css"
];

let totalChanges = 0;

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if there are changes to make
    if (content.match(/emerald-/g) || content.match(/teal-/g)) {
      content = content.replace(/emerald-(?=\d+)/g, 'blue-');
      content = content.replace(/teal-(?=\d+)/g, 'blue-');
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated theme colors in ${file}`);
      totalChanges++;
    }
  } else {
    console.log(`File not found: ${file}`);
  }
}

console.log(`Completed. Updated ${totalChanges} files.`);
