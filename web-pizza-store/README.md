# Web Pizza Store

Welcome to the repository for the front-end of the **Web Pizza Store** application!

This project is the user interface for the pizza ordering application developed as part of the final Explorer training challenge at Rocketseat.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hook.png" alt="Hook" width="25" height="25" /> Table of Contents

- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deploy](#deploy)
- [Documentation](#documentation)
- [License](#license)

## Description

The application is an interactive digital menu for a fictitious restaurant, allowing users to view dishes, place orders and interact with the system. 

## Features

- Login screen and user registration.
- Display of all available dishes.
- Search for dishes by name and ingredients.
- Full details of each dish when clicked on.
- Functionality for adding dishes to the cart, adjusting quantities and deleting items.
- Checkout page with summary and adress to delivery.
- Marking dishes as favorites.
- Responsive interface optimized for mobile devices.
- Animations and transitions for a fluid user experience.



## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Magnifying%20Glass%20Tilted%20Left.png" alt="Magnifying Glass Tilted Left" width="25" height="25" /> Project Structure

<details>
<summary> 
 Click to expand <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Ladder.png" alt="Ladder" width="20" height="20" />
</summary>

```
/web-pizza-store
├── public
│   └── favicon.ico
├── src
│   ├─── app
│   │   ├── (home)
│   │   │   │   ├── [id]
│   │   │   │   │   ├── edit
│   │   │   │   │   │   └── retriveId.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── retriveId.tsx
│   │   │   │   ├── new
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── searchProvider.tsx
│   │   ├── checkout
│   │   │   ├── delivery
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── global.css
│   │   ├── layout.tsx
│   │   ├── providers.jsx
│   │   └── template.tsx
│   ├─── assets
│   │   ├── imgs
│   │   │   └── cover-readme.png
│   │   ├── menu
│   │   │   └── ... imgs.png
│   ├─── components
│   │   ├─── cart
│   │   │   └── drobMenuCart.js
│   │   ├─── checkout
│   │   │   ├── delivery
│   │   │   │   └── handlwWithDelivery.tsx
│   │   │   ├── checkoutCartItems.tsx
│   │   │   └── handlwWithCheckout.tsx
│   │   ├─── forms
│   │   │   ├── ingredientsSection.tsx
│   │   │   ├── inputLabel.tsx
│   │   │   ├── inputSelect.tsx
│   │   │   ├── inputText.tsx
│   │   │   ├── newItem.tsx
│   │   │   └── searchForm.tsx
│   │   ├─── header
│   │   │   ├── cartList.tsx
│   │   │   ├── desktopView.tsx
│   │   │   ├── handleViewHeader.tsx
│   │   │   ├── logo.tsx
│   │   │   ├── mobiViewHeader.tsx
│   │   │   └── receiptCart.tsx
│   │   ├─── home
│   │   │   ├── edit
│   │   │   │   └── handleWithUpdate.tsx
│   │   │   ├── id
│   │   │   │   └── showProductID.tsx
│   │   │   ├── new
│   │   │   │   ├── handleCategorySelect.tsx
│   │   │   │   ├── handleImageUpload.tsx
│   │   │   │   ├── handleWithIngredients.tsx
│   │   │   │   └── productForm.tsx
│   │   │   ├── features.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── listProductsFeatures.tsx
│   │   │   └── main.tsx
│   │   ├─── loader
│   │   │   └── LoaderProducts.tsx
│   │   ├─── login
│   │   │   └── handleWithLogin.tsx
│   │   ├─── buttonReturn.tsx
│   │   ├─── buttonText.tsx
│   │   ├─── menuDrop.tsx
│   │   ├─── paragraph.tsx
│   │   └─── paragraphDivision.tsx
│   ├── hooks
│   │   ├─── auth.tsx
│   │   └─── orderRequest.tsx
│   ├─── lib
│   │   └── categorys.ts
│   ├─── services
│   │   └── api.js
│   └─── types
│       └── type.ts
├── .env
├── .eslintrc.json
├── .gitignore
├── next-env.d.ts.js
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```
</details>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Hammer%20and%20Wrench.png" alt="Hammer and Wrench" width="25" height="25" /> Configuration

1. Clone the repository:
   ```bash
   git clone https://github.com/Frankdias92/final-challenge-explorer
   ```

2. Navigate to the front-end folder:
   ```bash
   cd web-pizza-store
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm run dev
   ```

5. Access the application at [http://localhost:3000](http://localhost:3000).

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Sparkles.png" alt="Sparkles" width="25" height="25" /> Deploy

The front-end is hosted on Vercel. Access the application at [final-challenge.vercel.app](https://final-challenge-explorer.vercel.app).

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bookmark%20Tabs.png" alt="Bookmark Tabs" width="25" height="25" /> Documentation

For more details on the API and the back-end, see the [back-pizza-store README](../back-pizza-store/README.md).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
