import java.util.Scanner;

// -----------------------------
// Staff Class - Stores staff info like name and ID
// -----------------------------
class Staff {
    private String name;
    private int id;

    public Staff(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public void display() {
        System.out.println("Staff Name: " + name + ", ID: " + id);
    }

    public int getId() {
        return id;
    }
}

// -----------------------------
// InventoryItem Class - Each product/item in the supermarket
// -----------------------------
class InventoryItem {
    private int itemId;
    private String itemName;
    private int quantity;
    private double price;

    public InventoryItem(int itemId, String itemName, int quantity, double price) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.quantity = quantity;
        this.price = price;
    }

    public void addStock(int qty) {
        quantity += qty;
    }

    public void removeStock(int qty) {
        if (qty <= quantity) {
            quantity -= qty;
        } else {
            System.out.println("Not enough stock available.");
        }
    }

    public void display() {
        System.out.println("Item ID: " + itemId + ", Name: " + itemName + ", Qty: " + quantity + ", Price: Rs. " + price);
    }

    public int getItemId() {
        return itemId;
    }
}

// -----------------------------
// StaffManager Class - Handles staff-related actions
// -----------------------------
class StaffManager {
    Staff[] staff = new Staff[100];
    int staffCount = 0;
    Scanner sc = new Scanner(System.in);

    public StaffManager() {
        addInitialStaff("Kasun", 1001);
        addInitialStaff("Nimali", 1002);
        addInitialStaff("Sandun", 1003);
        addInitialStaff("Amali", 1004);
        addInitialStaff("Ruwan", 1005);
    }

    private void addInitialStaff(String name, int id) {
        staff[staffCount++] = new Staff(name, id);
    }

    public void add() {
        System.out.print("Enter Staff Name: ");
        String name = sc.nextLine();
        System.out.print("Enter Staff ID: ");
        int id = sc.nextInt(); sc.nextLine();
        staff[staffCount++] = new Staff(name, id);
        System.out.println("Staff added successfully!");
    }

    public void view() {
        if (staffCount == 0) {
            System.out.println("No staff available.");
            return;
        }
        for (int i = 0; i < staffCount; i++) {
            staff[i].display();
        }
    }

    public void remove() {
        System.out.print("Enter Staff ID to remove: ");
        int id = sc.nextInt(); sc.nextLine();
        boolean found = false;
        for (int i = 0; i < staffCount; i++) {
            if (staff[i].getId() == id) {
                for (int j = i; j < staffCount - 1; j++) {
                    staff[j] = staff[j + 1];
                }
                staffCount--;
                found = true;
                System.out.println("Staff removed.");
                break;
            }
        }
        if (!found) System.out.println("Staff not found.");
    }

    public boolean isValidStaff(int id) {
        for (int i = 0; i < staffCount; i++) {
            if (staff[i].getId() == id) return true;
        }
        return false;
    }
}

// -----------------------------
// InventoryManager Class - Handles item-related actions
// -----------------------------
class InventoryManager {
    InventoryItem[] items = new InventoryItem[100];
    int itemCount = 0;
    Scanner sc = new Scanner(System.in);

    public InventoryManager() {
        addInitialItem(1, "Rice", 100, 120.0);
        addInitialItem(2, "Sugar", 80, 130.0);
        addInitialItem(3, "Milk", 50, 90.0);
        addInitialItem(4, "Soap", 150, 60.0);
        addInitialItem(5, "Bread", 60, 55.0);
    }

    private void addInitialItem(int id, String name, int qty, double price) {
        items[itemCount++] = new InventoryItem(id, name, qty, price);
    }

    public void add() {
        System.out.print("Enter Item ID: ");
        int id = sc.nextInt(); sc.nextLine();
        System.out.print("Enter Item Name: ");
        String name = sc.nextLine();
        System.out.print("Enter Quantity: ");
        int qty = sc.nextInt();
        System.out.print("Enter Price: ");
        double price = sc.nextDouble(); sc.nextLine();
        items[itemCount++] = new InventoryItem(id, name, qty, price);
        System.out.println("Item added to inventory.");
    }

    public void view() {
        if (itemCount == 0) {
            System.out.println("No items in inventory.");
            return;
        }
        for (int i = 0; i < itemCount; i++) {
            items[i].display();
        }
    }

    public InventoryItem findItemById(int id) {
        for (int i = 0; i < itemCount; i++) {
            if (items[i].getItemId() == id) {
                return items[i];
            }
        }
        return null;
    }
}

// -----------------------------
// StockManager Class - Add/remove quantities
// -----------------------------
class StockManager {
    Scanner sc = new Scanner(System.in);
    InventoryManager inventory;

    public StockManager(InventoryManager inventory) {
        this.inventory = inventory;
    }

    public void addStock() {
        System.out.print("Enter Item ID: ");
        int id = sc.nextInt(); sc.nextLine();
        InventoryItem item = inventory.findItemById(id);
        if (item != null) {
            System.out.print("Enter Quantity to Add: ");
            int qty = sc.nextInt(); sc.nextLine();
            item.addStock(qty);
            System.out.println("Stock updated.");
        } else {
            System.out.println("Item not found.");
        }
    }

    public void removeStock() {
        System.out.print("Enter Item ID: ");
        int id = sc.nextInt(); sc.nextLine();
        InventoryItem item = inventory.findItemById(id);
        if (item != null) {
            System.out.print("Enter Quantity to Remove: ");
            int qty = sc.nextInt(); sc.nextLine();
            item.removeStock(qty);
            System.out.println("Stock updated.");
        } else {
            System.out.println("Item not found.");
        }
    }
}

// -----------------------------
// Main Class - Program starts here
// -----------------------------
public class SupermarketManagementSystem {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        StaffManager staffManager = new StaffManager();
        InventoryManager inventoryManager = new InventoryManager();
        StockManager stockManager = new StockManager(inventoryManager);

        while (true) {
            System.out.println("\n--- Supermarket Management System ---");
            System.out.println("1. Staff Management");
            System.out.println("2. Inventory Management");
            System.out.println("3. Stock In/Out Management");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");
            String choice = sc.nextLine();

            if (choice.equals("1")) {
                System.out.print("Enter Staff ID to access: ");
                String staffIdInput = sc.nextLine();

                // Check only if digits
                boolean isNumeric = true;
                for (int i = 0; i < staffIdInput.length(); i++) {
                    if (!Character.isDigit(staffIdInput.charAt(i))) {
                        isNumeric = false;
                        break;
                    }
                }

                if (isNumeric) {
                    int staffId = Integer.parseInt(staffIdInput);
                    if (staffManager.isValidStaff(staffId)) {
                        System.out.println("Access granted.");
                        System.out.println("1. Add Staff\n2. View Staff\n3. Remove Staff");
                        String staffChoice = sc.nextLine();
                        if (staffChoice.equals("1")) staffManager.add();
                        else if (staffChoice.equals("2")) staffManager.view();
                        else if (staffChoice.equals("3")) staffManager.remove();
                        else System.out.println("Invalid choice.");
                    } else {
                        System.out.println("Invalid Staff ID. Access denied.");
                    }
                } else {
                    System.out.println("Please enter numeric Staff ID only.");
                }
            }

            else if (choice.equals("2")) {
                System.out.println("1. Add Inventory Item\n2. View Inventory");
                String invChoice = sc.nextLine();
                if (invChoice.equals("1")) inventoryManager.add();
                else if (invChoice.equals("2")) inventoryManager.view();
                else System.out.println("Invalid choice.");
            }

            else if (choice.equals("3")) {
                System.out.println("1. Add Stock\n2. Remove Stock");
                String stockChoice = sc.nextLine();
                if (stockChoice.equals("1")) stockManager.addStock();
                else if (stockChoice.equals("2")) stockManager.removeStock();
                else System.out.println("Invalid choice.");
            }

            else if (choice.equals("4")) {
                System.out.println("Exiting... Thank you!");
                break;
            }

            else {
                System.out.println("Invalid choice. Try again.");
            }
        }
    }
}