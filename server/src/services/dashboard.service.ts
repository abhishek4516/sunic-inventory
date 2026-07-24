import Item from "../models/items";
import Issue from "../models/issue";

export const getDashboardData = async () => {
  const items = await Item.find().sort({ createdAt: -1 });

  const issues = await Issue.find()
    .populate("itemId", "name")
    .sort({ createdAt: -1 })
    .limit(5);
console.log("===== DASHBOARD DEBUG =====");
console.log("Items:", items.length);
console.log("Issues:", issues.length);

issues.forEach((issue) => {
  console.log({
    employee: issue.employeeName,
    quantity: issue.quantity,
    itemId: issue.itemId,
    createdAt: issue.createdAt,
  });
});
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

  const inventoryActivities = recentItems.map((item) => ({
    id: item._id.toString(),
    text: `${item.name} was added to inventory`,
    time: new Date(item.createdAt).toLocaleDateString(),
    createdAt: item.createdAt,
  }));

  const issueActivities = issues.map((issue) => ({
    id: issue._id.toString(),
    text: `Issued ${issue.quantity} ${(issue.itemId as any).name} to ${issue.employeeName}`,
    time: new Date(issue.createdAt).toLocaleDateString(),
    createdAt: issue.createdAt,
  }));

  const recentActivity = [...inventoryActivities, ...issueActivities]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5)
    .map(({ createdAt, ...activity }) => activity);

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