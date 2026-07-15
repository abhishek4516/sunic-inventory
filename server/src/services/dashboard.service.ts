import Item from "../models/items";

export const getDashboardData = async () => {
  const items = await Item.find().sort({ createdAt: -1 });

  const totalItems = items.length;

  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const availableQuantity = items.reduce(
    (sum, item) => sum + item.availableQuantity,
    0
  );

  const lowStock = items.filter(
    (item) =>
      item.availableQuantity > 0 &&
      item.availableQuantity <= 5
  );

  const outOfStock = items.filter(
    (item) => item.availableQuantity === 0
  );

  const categoryMap = new Map<string, number>();

  items.forEach((item) => {
    categoryMap.set(
      item.category,
      (categoryMap.get(item.category) || 0) + 1
    );
  });

  const categories = Array.from(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  const recentItems = items.slice(0, 5);

  const recentActivity = recentItems.map((item) => ({
    id: item._id.toString(),
    text: `${item.name} was added to inventory`,
    time: new Date(item.createdAt).toLocaleDateString(),
  }));

  return {
    stats: {
      totalItems,
      totalQuantity,
      availableQuantity,
      lowStock: lowStock.length,
      outOfStock: outOfStock.length,
    },

    categories,

    lowStockItems: lowStock,

    recentItems,

    recentActivity,
  };
};