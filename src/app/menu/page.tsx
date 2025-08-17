import React from "react";
import MenuPart from "../_components/MenuPart/MenuPart";

const pizza = [
  //   basePrice: number;
  // categoryId: string;
  // createdAt: Date;
  // description: string;
  // id: string;
  // image: string;
  // name: string;
  // order: number;
  // updatedAt: Date;
  {
    id: "1",
    name: "Margherita Classic",
    description: "San Marzano tomato sauce, fresh mozzarella, basil",
    image:
      "https://www.google.com/imgres?q=pizza&imgurl=https%3A%2F%2Farecipeforfun.com%2Fwp-content%2Fuploads%2F2025%2F03%2FEdits-Turkey-Pepperoni-Pizza-Recipe-14.jpg&imgrefurl=https%3A%2F%2Farecipeforfun.com%2Fturkey-pepperoni-pizza%2F&docid=cJoddVBWjlWy7M&tbnid=CDxW8E_SKjk6JM&vet=12ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA",
    order: 1,
    basePrice: 12.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryId: "2",
  },
  {
    id: "2",
    name: "Pepperoni Feast",
    description: "Double pepperoni, mozzarella, and our signature sauce",
    image:
      "https://www.google.com/imgres?q=pizza&imgurl=https%3A%2F%2Farecipeforfun.com%2Fwp-content%2Fuploads%2F2025%2F03%2FEdits-Turkey-Pepperoni-Pizza-Recipe-14.jpg&imgrefurl=https%3A%2F%2Farecipeforfun.com%2Fturkey-pepperoni-pizza%2F&docid=cJoddVBWjlWy7M&tbnid=CDxW8E_SKjk6JM&vet=12ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA",
    order: 2,
    basePrice: 14.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryId: "1",
  },
  {
    id: "3",
    name: "Truffle Mushroom",
    description: "Wild mushrooms, truffle oil, fontina cheese, arugula",
    image:
      "https://www.google.com/imgres?q=pizza&imgurl=https%3A%2F%2Farecipeforfun.com%2Fwp-content%2Fuploads%2F2025%2F03%2FEdits-Turkey-Pepperoni-Pizza-Recipe-14.jpg&imgrefurl=https%3A%2F%2Farecipeforfun.com%2Fturkey-pepperoni-pizza%2F&docid=cJoddVBWjlWy7M&tbnid=CDxW8E_SKjk6JM&vet=12ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA",
    order: 3,
    basePrice: 16.99,
    createdAt: new Date(),
    updatedAt: new Date(),
    categoryId: "3",
  },
];

// const pizza = [
//   {
//     id: 1,
//     name: "string",
//     description: "string",
//     imageUrl:
//       "https://www.google.com/imgres?q=pizza&imgurl=https%3A%2F%2Farecipeforfun.com%2Fwp-content%2Fuploads%2F2025%2F03%2FEdits-Turkey-Pepperoni-Pizza-Recipe-14.jpg&imgrefurl=https%3A%2F%2Farecipeforfun.com%2Fturkey-pepperoni-pizza%2F&docid=cJoddVBWjlWy7M&tbnid=CDxW8E_SKjk6JM&vet=12ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA",
//     order: 1,
//     basePrice: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 1,
//     name: "string",
//     description: "string",
//     imageUrl:
//       "https://www.google.com/imgres?q=pizza&imgurl=https%3A%2F%2Farecipeforfun.com%2Fwp-content%2Fuploads%2F2025%2F03%2FEdits-Turkey-Pepperoni-Pizza-Recipe-14.jpg&imgrefurl=https%3A%2F%2Farecipeforfun.com%2Fturkey-pepperoni-pizza%2F&docid=cJoddVBWjlWy7M&tbnid=CDxW8E_SKjk6JM&vet=12ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA",
//     order: 1,
//     basePrice: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
//   {
//     id: 1,
//     name: "string",
//     description: "string",
//     imageUrl:
//       "https://www.google.com/imgres?q=pizza&imgurl=https%3A%2F%2Farecipeforfun.com%2Fwp-content%2Fuploads%2F2025%2F03%2FEdits-Turkey-Pepperoni-Pizza-Recipe-14.jpg&imgrefurl=https%3A%2F%2Farecipeforfun.com%2Fturkey-pepperoni-pizza%2F&docid=cJoddVBWjlWy7M&tbnid=CDxW8E_SKjk6JM&vet=12ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjPreq7uI-PAxVAUkEAHZF3LDEQM3oECCEQAA",
//     order: 1,
//     basePrice: 1,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   },
// ];
const MenuPage = () => {
  return (
    <div className="dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center p-7">Menu Page</h1>
      <p className="text-center mt-4">
        This is the menu page where you can explore our delicious offerings.
      </p>
      {/* Additional content can be added here */}
      <MenuPart data={pizza} title="Classic Pizza" description="old" />
      <MenuPart data={pizza} title="Classic Pizza" description="old" />
      <MenuPart data={pizza} title="Classic Pizza" description="old" />
    </div>
  );
};

export default MenuPage;
