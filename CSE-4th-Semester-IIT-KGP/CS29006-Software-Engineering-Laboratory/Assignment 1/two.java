import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;

class Main {

    /**
     * Declared all the ArrayLists needed for the Problem...... Namely
     *
     * @param manufacturers used to store the List of Manufacturer Present in our Database
     * @param customers used to store the List of Customers present in our Database
     * @param shops used to store the List of shops present in our
     */
    ArrayList<Manufacturer> manufacturers;
    ArrayList<Customer> customers;
    ArrayList<Shop> shops;
    ArrayList<DeliveryAgent> deliverables;
    ArrayList<Product> products;

    Main() {
        this.manufacturers = new ArrayList<>();
        this.customers = new ArrayList<>();
        this.shops = new ArrayList<>();
        this.deliverables = new ArrayList<>();
        this.products = new ArrayList<>();
    }

    public static void main(String[] args) {
        Main ob = new Main();
        ob.manufacturers = new ArrayList<Manufacturer>();
        ob.customers = new ArrayList<Customer>();
        ob.shops = new ArrayList<Shop>();
        ob.deliverables = new ArrayList<DeliveryAgent>();
        ob.products = new ArrayList<Product>();

        Scanner sc_ = new Scanner(System.in);
        ob.welcomeMessage();
        int task = sc_.nextInt();
        while (task != 0) {
            switch (task) {
                case 1 -> ob.task1();
                case 2 -> ob.task2();
                case 3 -> ob.task3();
                case 4 -> ob.task4();
                case 5 -> ob.task5();
                case 6 -> ob.task6();
                case 7 -> ob.task7();
                default -> {
                    System.out.println("-------Enter Valid Task!!------");
                    System.out.println();
                }
            }
            ob.welcomeMessage();
            task = sc_.nextInt();
        }
        sc_.close();
    }

    void printEntities(int entity) {
        switch (entity) {
            case 1:
                for (Product i : this.products) {
                    i.printEntity();
                }
                break;
            case 2:
                for (Manufacturer i : this.manufacturers) {
                    i.printEntity();
                }
                break;
            case 3:
                for (Customer i : this.customers) {
                    i.printEntity();
                }
                break;
            case 4:
                for (Shop i : this.shops) {
                    i.printEntity();
                }
                break;
            case 5:
                for (DeliveryAgent i : this.deliverables) {
                    i.printEntity();
                }
                break;
            default:
                System.out.println("-------Enter Valid Task!!------");
                break;
        }
        System.out.println();
    }

    void welcomeMessage() {
        System.out.println("-----Welcome to Kushaz's Medicine Shop-----");
        System.out.println();
        System.out.println("------List of Tasks------");
        System.out.println();
        System.out.println("1. Create,Delete or Print Entities.");
        System.out.println("2. Add a product to manufacturer.");
        System.out.println("3. Add a number of copies of a product to a shop.");
        System.out.println("4. Process an order of a product from a customer and Assign Delivery Agent.");
        System.out.println("5. List all the purchases made by a customer.");
        System.out.println("6. List inventory of a shop.");
        System.out.println("7. List Products made by a manufacturer.");
        System.out.println("--What task would you like to perform (Enter 0 to exit) : ");
    }

    void task1() {
        System.out.print("1 for Creating an Entity, 2 for Printing an Entity, 3 for Deleting an Entity  : ");
        Scanner sc = new Scanner(System.in);
        int todo = sc.nextInt();
        System.out.print("1 for Product, 2 for Manufacturer, 3 for Customer, 4 for Shop, 5 for Delivery Agent : ");
        int entity = sc.nextInt();
        System.out.println();
        switch (todo) {
            case 1 -> {
                System.out.print("Enter ID : ");
                int ID = sc.nextInt();
                System.out.print("Enter Name : ");
                String Name = sc.next();
                switch (entity) {
                    case 1 -> {
                        Product p = new Product(ID, Name);
                        products.add(p);
                        System.out.println("Product Entity Created!!");
                    }
                    case 2 -> {
                        Manufacturer m = new Manufacturer(ID, Name);
                        manufacturers.add(m);
                        System.out.println("Manufacturer Entity Created");
                    }
                    case 3 -> {
                        System.out.print("Enter ZipCode : ");
                        int zipcode_c = sc.nextInt();
                        Customer c = new Customer(ID, Name, zipcode_c);
                        this.customers.add(c);
                        System.out.println("Customer Entity Created!!");
                    }
                    case 4 -> {
                        System.out.print("Enter ZipCode : ");
                        int zipcode_s = sc.nextInt();
                        Shop s = new Shop(ID, Name, zipcode_s);
                        this.shops.add(s);
                        System.out.println("Shop Entity Created!!");
                    }
                    case 5 -> {
                        System.out.print("Enter ZipCode : ");
                        int zipcode_d = sc.nextInt();
                        DeliveryAgent d = new DeliveryAgent(ID, Name, zipcode_d);
                        this.deliverables.add(d);
                        System.out.println("DeliveryAgent Entity Created!!");
                    }
                    default -> System.out.println("-------Enter Valid Task!!------");
                }
            }
            case 2 -> printEntities(entity);
            case 3 -> {
                printEntities(entity);
                System.out.print("Enter ID of Entity to Delete : ");
                int ID_d = sc.nextInt();
                switch (entity) {
                    case 1 -> this.products.removeIf(ob -> ob.id == ID_d);
                    case 2 -> this.manufacturers.removeIf(ob -> ob.id == ID_d);
                    case 3 -> this.customers.removeIf(ob -> ob.id == ID_d);
                    case 4 -> this.shops.removeIf(ob -> ob.id == ID_d);
                    case 5 -> this.deliverables.removeIf(ob -> ob.id == ID_d);
                    default -> {
                    }
                }
                System.out.print("Entity Successfully Deleted!!");
            }
            default -> System.out.println("-------Enter Valid Task!!------");
        }
        sc.close();
    }

    void task2() {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter ID of Manufacturer : ");
        int ID_m = sc.nextInt();
        System.out.println("Enter ID of Product : ");
        int ID_p = sc.nextInt();
        int index_m = -1;
        int index_p = -1;
        for (int i = 0; i < this.manufacturers.size(); i++) {
            if (this.manufacturers.get(i).id == ID_m) {
                index_m = i;
                break;
            }
        }
        for (int i = 0; i < this.products.size(); i++) {
            if (this.products.get(i).id == ID_p) {
                index_p = i;
                break;
            }
        }
        if (index_m == -1 || index_p == -1) {
            System.out.println("-------Enter Valid Task!!------");
        } else {
            this.products.get(index_p).manufacturer = this.manufacturers.get(index_m);
            this.manufacturers.get(index_m).ProductList.add(this.products.get(index_p));
            System.out.println("Product Assigned to Manufacturer!!");
        }
        sc.close();
    }

    void task3() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter ID of Shop : ");
        int ID_s = sc.nextInt();
        System.out.print("Enter ID of Product : ");
        int ID_p = sc.nextInt();
        int index_s = -1;
        int index_p = -1;
        for (int i = 0; i < this.shops.size(); i++) {
            if (this.shops.get(i).id == ID_s) {
                index_s = i;
                break;
            }
        }
        for (int i = 0; i < this.products.size(); i++) {
            if (this.products.get(i).id == ID_p) {
                index_p = i;
                break;
            }
        }
        if (index_s == -1 || index_p == -1) {
            System.out.println("-------Enter Valid Task!!------");
        } else {
            System.out.print("Enter Number Copies of Product : ");
            int count = sc.nextInt();
            this.shops.get(index_s).addInventory(this.products.get(index_p), count);
            System.out.println("Inventory Updated Successfully!!");
        }
        sc.close();
    }

    void task4() {
        System.out.print("Enter ID of Customer : ");
        Scanner sc = new Scanner(System.in);
        int ID_c = sc.nextInt();
        int index_c = -1;
        for (int i = 0; i < this.customers.size(); i++) {
            if (this.customers.get(i).id == ID_c) {
                index_c = i;
                break;
            }
        }
        if (index_c == -1) {
            System.out.println("-------Enter Valid Task!!------");
        }
        System.out.print("Enter ID of Product : ");
        int ID_p = sc.nextInt();
        int index_p = -1;
        for (int i = 0; i < this.products.size(); i++) {
            if (this.products.get(i).id == ID_p) {
                index_p = i;
                break;
            }
        }
        if (index_p == -1) {
            System.out.println("-------Enter Valid Task!!------");
        }
        int index_s = -1;
        for (int i = 0; i < this.shops.size(); i++) {
            if (this.shops.get(i).zipcode == this.customers.get(index_c).zipcode && this.shops.get(i).Inventory.containsKey(this.products.get(index_p))) {
                index_s = i;
                break;
            }
        }
        int mindelivered = 100000;
        int index_d = -1;
        for (int i = 0; i < this.deliverables.size(); i++) {
            if (this.deliverables.get(i).zipcode == this.customers.get(index_c).zipcode) {
                if (mindelivered > this.deliverables.get(i).getDelivered()) {
                    mindelivered = this.deliverables.get(i).getDelivered();
                    index_d = i;
                }
            }
        }
        if (index_d != -1 && index_s != 1) {
            this.deliverables.get(index_d).incrementDelivered();
            this.shops.get(index_s).decInventory(this.products.get(index_p));
            System.out.println("Order Processed Successfully !!");
        } else System.out.println("Order Could Not be Processed Successfully !!");
        sc.close();
    }

    void task5() {
        System.out.print("Enter ID of Customer : ");
        Scanner sc = new Scanner(System.in);
        int ID = sc.nextInt();
        int index = -1;
        for (int i = 0; i < this.customers.size(); i++) {
            if (this.customers.get(i).id == ID) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            System.out.println("-------Enter Valid Task!!------");
        } else {
            this.customers.get(index).printProductList();
        }
        sc.close();
    }

    void task6() {
        System.out.print("Enter ID of Shop : ");
        Scanner sc = new Scanner(System.in);
        int ID = sc.nextInt();
        int size = this.shops.size();
        int index = -1;
        for (int i = 0; i < size; i++) {
            if (this.shops.get(i).id == ID) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            System.out.println("-------Enter Valid Task!!------");
        } else {
            this.shops.get(index).printInventory();
        }
        sc.close();
    }

    void task7() {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter ID of Manufacturer : ");
        int ID = sc.nextInt();
        int size = this.manufacturers.size();
        int index = -1;
        for (int i = 0; i < size; i++) {
            if (this.manufacturers.get(i).id == ID) {
                index = i;
                break;
            }
        }
        if (index == -1) {
            System.out.println("-------Enter Valid Task!!------");
        } else {
            this.manufacturers.get(index).PrintProductList();
        }
        sc.close();
    }

    private static class Entity {
        int id;
        String name;

        Entity() {
            id = -1;
            name = "";
        }

        public void printEntity() {
            System.out.println("Name : " + this.name + " ID : " + this.id);
        }

        protected void createEntity(int ID, String Name) {
            this.id = ID;
            this.name = Name;
        }
    }

    protected class Product extends Entity {

        Manufacturer manufacturer;

        Product(int ID, String Name) {
            this.createEntity(ID, Name);
        }

        public void setManufacturer(Manufacturer manufacturer) {
            this.manufacturer = manufacturer;
        }
    }

    protected class Manufacturer extends Entity {

        ArrayList<Product> ProductList;
        int ProductCount;

        Manufacturer(int ID, String Name) {
            ProductList = new ArrayList<Product>();
            ProductCount = 0;
            this.createEntity(ID, Name);
        }

        public void AddProduct(Product product) {
            this.ProductList.add(product);
            ProductCount++;
        }

        public void PrintProductList() {
            int size = this.ProductList.size();
            for (Product product : this.ProductList) {
                product.printEntity();
            }
        }
    }

    protected class Customer extends Entity {

        int zipcode;
        ArrayList<Product> ProductList;

        Customer(int ID, String Name, int zipcode) {
            ProductList = new ArrayList<Product>();
            this.createEntity(ID, Name);
            this.zipcode = zipcode;
        }

        public void AddProduct(Product product) {
            this.ProductList.add(product);
        }

        public void printProductList() {
            int size = this.ProductList.size();

            for (Product product : this.ProductList) {
                product.printEntity();
            }
        }

    }

    protected class Shop extends Entity {
        int zipcode;
        HashMap<Product, Integer> Inventory;

        Shop(int ID, String Name, int zipcode) {
            this.createEntity(ID, Name);
            this.zipcode = zipcode;
            Inventory = new HashMap<Product, Integer>();
        }

        public void addInventory(Product product, int count) {
            this.Inventory.put(product, count);
        }

        public void decInventory(Product product) {
            int c = this.Inventory.get(product);
            if (c - 1 != 0)
                this.Inventory.put(product, c - 1);
            else this.Inventory.remove(product);
        }

        public void printInventory() {
            for (Product i : this.Inventory.keySet()) {
                int count = this.Inventory.get(i);
                System.out.print("Product : ");
                i.printEntity();
                System.out.println("Count is : " + count);
            }
        }
    }

    protected static class DeliveryAgent extends Entity {

        int zipcode;
        int prodDelivered;

        DeliveryAgent(int ID, String Name, int zipcode) {
            this.createEntity(ID, Name);
            this.zipcode = zipcode;
            prodDelivered = 0;
        }

        public void incrementDelivered() {
            this.prodDelivered = this.prodDelivered + 1;
        }

        public int getDelivered() {
            return this.prodDelivered;
        }
    }
}
