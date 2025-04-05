// Helper functions for the checkout process

// Add a room reservation to localStorage for checkout
export function addRoomToCheckout(room: {
  id: string;
  name: string;
  price: number;
  image: string;
  duration: number;
}) {
  // Clear any previous checkout items
  localStorage.removeItem("checkout_items");
  
  // Add room to checkout
  const checkoutItem = {
    id: room.id,
    name: `${room.name} (${room.duration} hours)`,
    price: room.price * room.duration,
    image: room.image,
    quantity: 1,
    type: "reservation"
  };
  
  localStorage.setItem("checkout_items", JSON.stringify([checkoutItem]));
}

// Add a class or event to checkout
export function addClassToCheckout(classEvent: {
  id: string;
  title: string;
  price: number;
  image: string;
}) {
  // Clear any previous checkout items
  localStorage.removeItem("checkout_items");
  
  // Add class to checkout
  const checkoutItem = {
    id: classEvent.id,
    name: classEvent.title,
    price: classEvent.price,
    image: classEvent.image,
    quantity: 1,
    type: "class"
  };
  
  localStorage.setItem("checkout_items", JSON.stringify([checkoutItem]));
}

// Get checkout items
export function getCheckoutItems() {
  if (typeof window === "undefined") return [];
  
  const items = localStorage.getItem("checkout_items");
  if (!items) return [];
  
  try {
    return JSON.parse(items);
  } catch (error) {
    console.error("Failed to parse checkout items", error);
    return [];
  }
}

// Clear checkout items
export function clearCheckoutItems() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("checkout_items");
} 