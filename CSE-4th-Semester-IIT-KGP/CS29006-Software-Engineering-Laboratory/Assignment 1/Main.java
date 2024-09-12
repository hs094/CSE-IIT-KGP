/**
 * This is My Assignment from the CS29206-Software Engineering.
 * <p>
 * Please Note I have used OPEN JDK 17 throughout my Assignment and also to Build/Run/Test the Application.
 * <p>
 * this is an Implementation of a Online Medicine Store System.
 *
 * @Imported the @Important Java Libraries namely the Utility, Lang and The Input/Output Library
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

/**
 * Declared an Interface to Take Input/Output from its Inherited Classes:-
 * The interface in Java is a mechanism to achieve abstraction.
 * There can be only abstract methods in the Java interface, not method body.
 * It is used to achieve abstraction and multiple inheritance in Java.
 */
interface InputOutput {
    /**
     * The Scanner class is used to take Input from all the classes who implement this Interface
     * a.k.a. principle of Abstraction.
     *
     * @method input, output is an overloaded function implemented in multiple abstracted classes.
     */
    Scanner sc = new Scanner(System.in);

    void input(String s);

    void print(String s);
}

class Entity implements InputOutput {
    /**
     * @param UID is used to Store the Unique Identification Number of the Entity.
     * @param Name is used to Store the Name of the Entity
     */
    private int UID;
    private String Name;

    // Constructor for the Entity
    public Entity() {
        this.Name = "";
        this.UID = 0;
    }

    // Overloaded Function to Print the Name and UID.
    @Override
    public void print(String n) {
        System.out.println("****** " + n.toUpperCase() + " ******");
        System.out.println("* Unique Identification Number * :" + this.UID);
        System.out.println("* Name of the " + n + " is * :" + this.Name);
    }

    // Overloaded Function to Take Input for the Name and UID.
    @Override
    public void input(String n) {
        System.out.println("* Please Enter the Name of the " + n + " * :");
        this.Name = sc.nextLine();
        System.out.println("* Please Enter the Unique Identification Number of the " + n + " * :");
        this.UID = sc.nextInt();
    }

    // Setter for the Entity Class
    public Entity setEntity(String Name, int UID) {
        Entity en = new Entity();
        en.Name = Name;
        en.UID = UID;
        return en;
    }

    // Getters for the Entity class
    public String getName() {
        return this.Name;
    }

    public int getUID() {
        return this.UID;
    }
}

class Manufacturer extends Entity implements InputOutput {
    /**
     * @param m is an Instance of the Entity Class Used to Store the Name and UID of the Manufacturer
     * @param list is a ArrayList to Store the Products( with their name and UID ) of the
     */
    private final Entity m;
    private final ArrayList<Entity> list;

    // Constructor for the Manufacturer Class
    public Manufacturer() {
        this.m = new Entity();
        this.list = new ArrayList<>();
    }

    // Overloaded method to take input for the Manufacturer(The Number of Products it manufacturers and also their name and UID)
    public void inOb() {
        this.m.input("Manufacturer");
    }

    @Override
    public void input(String n) {
        System.out.println("Please Enter the Number of Products you are adding");
        int a = sc.nextInt();
        System.out.println("Please Enter the Products List in Following Format......[\"Name\"  \"UID\"]");
        while (a-- > 0) {
            String s = sc.nextLine();
            Entity en = new Entity().setEntity(s.substring(0, s.indexOf(' ') + 1), Integer.parseInt(s.substring(s.lastIndexOf(' ') + 1)));
            list.add(en);
        }
    }

    // Overloaded method to print output of the list of the products that the manufacturer manufactures.
    @Override
    public void print(String n) {
        System.out.println("The List of Products that the Manufacturer can Produce:");
        for (Entity en : list) {
            System.out.println(en.getUID() + "\t\t" + en.getName());
        }
    }
}

class Customer extends Entity implements InputOutput {
    /**
     * @param m Stores the name and UID of the User
     * @param zipCode Stores the zipCode where the user wishes his products to be delivered.
     * @param @purchased Stores the Information of the Products that the user wishes to order.
     */
    private final Entity m;
    private final int zipCode;
    //    private final ArrayList<Product> purchased = new ArrayList<>();
    private final Map<Entity, Integer> purchased = new HashMap<>();

    {
        System.out.println("Sorry !! You haven't Processed an Order.");
    }

    //    private final ArrayList<Integer> v = new ArrayList<>();
//    Constructor for the Customer Class.
    public Customer() {
        this.m = new Entity();
        this.zipCode = 0;
    }

    public void inOb() {
        this.m.input("Customer");
    }

        // Taking Input for the Products that the user wishes to order using the concept of abstraction and interface InputOutput
    @Override
    public void input(String n) {
        System.out.println("Please Enter the Name and UID of the Products you are ordering:");
        Entity en = new Entity();
        en.input("Entity");
        purchased.put(en, 0);
    }

// printing the list of the products that the user ordered.
    @Override
    public void print(String n) {
        System.out.println("The LIST of the Products you ordered are:");
        System.out.println("******** LIST OF PRODUCTS ********");
        System.out.println("UID\tCount\tName");
        if (this.purchased.size() != 0) {
            for(Map.Entry<Entity, Integer> v: purchased.entrySet())
            {
                System.out.println(v.getKey().getUID()+"\t"+v.getKey().getName()+"\t"+v.getValue());

        }
    }

}

    public Map<Entity, Integer> getList() {
        return this.purchased;
    }

    public Map<Entity, Integer> getPurchased() {
        return this.purchased;
    }

    public int getZipCode() {
        return this.zipCode;
    }
}

class Product extends Entity implements InputOutput {
    /**
     * @param en to Store the name and UID of the Product(object of the Entity Class)
     * @param mn to Store the Information of the manufacturer who produces the said Product (en).
     */
    private final Entity en;
    private final Manufacturer mn;

    public Product() {
        this.en = new Entity();
        this.en.input("Product"); // Taking Input for the Input.
        this.mn = new Manufacturer();
        mn.input("Manufacturer"); // Taking Input of the manufacturer.
    }

    public void inOb() {
        this.en.input("Product");
    }
}

class Warehouse extends Entity implements InputOutput {
    private final HashMap<Entity, Integer> inventory;
    private int zipCode;

    public Warehouse() {
        this.zipCode = 0;
        this.inventory = new HashMap<>();
    }

    @Override
    public void input(String n) {
        System.out.println("Please Enter the Input for the " + n + ":");
        this.zipCode = sc.nextInt();
        System.out.println("Please Enter the Number of Items you are Wishing to Enter in the Inventory of the Warehouse");
        int a = sc.nextInt();
        System.out.println("Please Enter:");
        while (a-- > 0) {
            Entity en = new Entity();
            System.out.println("Name:");
            String o = sc.nextLine();
            System.out.println("UID:");
            int u = sc.nextInt();
            en.setEntity(o, u);
            System.out.println("Copies:");
            int c = sc.nextInt();
            inventory.put(en, c);
        }
    }

    @Override
    public void print(String n) {
        System.out.println("The UID's, Name's and the Copies present in the Warehouse");
        for (Map.Entry<Entity, Integer> v : this.inventory.entrySet()) {
            System.out.println(v.getKey().getUID() + " " + v.getKey().getName() + " " + v.getKey());
        }
    }

    public HashMap<Entity, Integer> getInventory() {
        return this.inventory;
    }

    public int getZipCode() {
        return this.zipCode;
    }

    public void update(Entity name, int count) {
        this.inventory.put(name, this.inventory.get(name) + count);
    }

    public void decInventory(Product product) {
        int c = this.inventory.get(product);
        if (c - 1 != 0)
            this.inventory.put(product, c - 1);
        else this.inventory.remove(product);
    }
}

class Agent extends Entity implements InputOutput {
    private final Entity en;
    private int zipCode;
    private int number;

    public Agent() {
        this.en = new Entity();
        this.zipCode = 0;
        this.number = 0;
    }

    public void inOb() {
        this.en.input("Agent");
    }

    @Override
    public void input(String n) {
        System.out.println("Please Enter the Number of zipCode where the Delivery Agent delivers");
        this.zipCode = sc.nextInt();

    }

    public int getNumber() {
        return this.number;
    }

    public int getZipCode() {
        return this.zipCode;
    }

    public void update_Delivery(int n) {
        this.number += n;
    }
}

class Task implements InputOutput {

    int ch;

    Task() {
        this.ch = 0;
    }

    @Override
    public void input(String s) {
        this.ch = sc.nextInt();
    }

    @Override
    public void print(String n) {
        System.out.println("Dear User !! Please Enter the the Choice from the Following Options:.....(InCase you wish to Exit Press 0)");
        System.out.println("1. CREATE, DELETE , PRINT Entities of the Provided Type.");
        System.out.println("2. ADD a product to the manufacturer.");
        System.out.println("3. ADD a certain number of Copies of a Product to a Shop.");
        System.out.println("4. ADD an order of a product from a customer.");
        System.out.println("5. Process an Order");
        System.out.println("6. List all the Purchases made by you.");
        System.out.println("7. List inventory of a Shop.");
        System.out.println("8. Products made by a manufacturer");
        System.out.println("****** ENTER ZERO TO EXIT ******");
    }

}

public class Main {
    public static void main(String[] args) {
        /**
         * @param mn Assuming that there are multiple Manufacturers
         * @param wr Assuming that they are multiple Warehouses/Shops
         * @param ag Assuming that there are multiple Delivery Agents.
         * @param cu to store the Details of the Customer
         */
        ArrayList<Manufacturer> mn = new ArrayList<>();
        ArrayList<Warehouse> wr = new ArrayList<>();
        ArrayList<Agent> ag = new ArrayList<>();
        ArrayList<Product> pr = new ArrayList<>();

        ArrayList<Customer> cu = new ArrayList<>();

        Scanner sc = new Scanner(System.in);
        System.out.println("********************* ~~~~~~~~~~~~ WELCOME TO THE ONLINE PHARMACEUTICAL STORE ~~~~~~~~~~~~ *********************");
        System.out.println(":::::::::::::::::::::  Your One Stop Destination to all Your Pharmaceutical and Related Needs ::::::::::::::::::");
        Task t = new Task();
        t.print("Task");
        t.ch = sc.nextInt();
        ArrayList<String> active_Entities = new ArrayList<>();
        while (t.ch != 0) {
            switch (t.ch) {
                case 1 -> {
                    System.out.println("Please Enter :-");
                    System.out.println("CHOICE '1': CREATE NEW ENTITY");
                    System.out.println("CHOICE '2': DELETE AN ENTITY");
                    System.out.println("CHOICE '3': PRINT ALL ENTITIES");
                    int en = sc.nextInt();
                    switch (en) {
                        case 1 -> {
                            System.out.println("Enter the Entity to be created:");
                            System.out.println("1. Enter 'Manufacturer' to CREATE Manufacturer Entity:");
                            System.out.println("2. Enter 'Customer' to CREATE Customer Entity:");
                            System.out.println("3. Enter 'Product' to CREATE Product Entity");
                            System.out.println("4. Enter 'Warehouse' to CREATE Warehouse Entity");
                            System.out.println("5. Enter 'Agent' to CREATE Agent Entity");
                            String o = sc.next();
                            switch (o) {
                                case "Manufacturer" -> {
                                    active_Entities.add("Manufacturer");
                                    Manufacturer ob = new Manufacturer();
                                    ob.inOb();
                                    mn.add(ob);
                                    System.out.println("*** New Manufacturer has been added to our Mongo DB Atlas Database.");
                                }
                                case "Customer" -> {
                                    active_Entities.add("Customer");
                                    Customer c = new Customer();
                                    c.inOb();
                                    cu.add(c);
                                    System.out.println("*** YOU (New Customer) are added to our Mongo DB Atlas Database.");
                                }
                                case "Product" -> {
                                    active_Entities.add("Product");
                                    Product ob = new Product();
                                    ob.inOb();
                                    pr.add(ob);
                                    System.out.println("*** New Product has been added to our Mongo DB Atlas Database.");
                                }
                                case "Warehouse" -> {
                                    active_Entities.add("Warehouse");
                                    Warehouse ob = new Warehouse();
                                    ob.input("Warehouse");
                                    wr.add(ob);
                                    System.out.println("*** New Warehouse has been added to our Mongo DB Atlas Database.");
                                }
                                case "Agent" -> {
                                    active_Entities.add("Agent");
                                    Agent ob = new Agent();
                                    ob.inOb();
                                    ag.add(ob);
                                    System.out.println("*** New Agent has been added to our Mongo DB Atlas Database.");
                                }

                            }
                        }
                        case 2 -> {
                            System.out.println("Enter the Entity to be Deleted:");
                            System.out.println("1. Enter 'Manufacturer' for Manufacturer:");
                            System.out.println("2. Enter 'Product' for Product:");
                            System.out.println("3. Enter 'Warehouse' for Warehouse:");
                            System.out.println("4. Enter 'Agent' for Agent:");

                            String ob = sc.next();
                            System.out.println("Also Enter the Name of the Entity you wish to Delete:(Name Attribute in the Entity Class):");
                            String name = sc.next();
                            switch (ob) {
                                case "Manufacturer" -> {
                                    mn.removeIf(obj -> obj.getName().equals(name));
                                    System.out.println("*** The Given Manufacturer(if Present) has been removed to our Mongo DB Atlas Database.");
                                }
                                case "Product" -> {
                                    pr.removeIf(obj -> obj.getName().equals(name));
                                    System.out.println("*** The Given Product(if Present) has been removed to our Mongo DB Atlas Database.");
                                }
                                case "Warehouse" -> {
                                    wr.removeIf(obj -> obj.getName().equals(name));
                                    System.out.println("*** The Given Warehouse(if Present) has been removed to our Mongo DB Atlas Database.");
                                }
                                case "Agent" -> {
                                    ag.removeIf(obj -> obj.getName().equals(name));
                                    System.out.println("*** The Given Agent(if Present) has been removed to our Mongo DB Atlas Database.");
                                }
                            }
                        }
                        case 3 -> {
                            System.out.println("The Entities that are Currently CREATED and are ACTIVE:");
                            for (String i : active_Entities)
                                System.out.println(i);
                            System.out.println("~~~~~~ ******** END OF FILE ******** ~~~~~~");
                        }
                    }
                }

                case 2 -> {
                    System.out.println("Enter the Name of the manufacturer for whom you wish to Add the Products for:");
                    String m = sc.next();
                    int i = 0;
                    for (i = 0; i < mn.size(); i++) {
                        if (mn.get(i).getName().equals(m)) break;
                    }
                    mn.get(i).input("Manufacturer");
                }

                case 3 -> {
                    System.out.println("Please Enter the Name or UID of the Shop:......Enter Name or UID ");
                    String n = sc.next();
                    if (n.equals("Name")) {
                        System.out.println("Name:");
                        String n_ = sc.next();
                        int i = 0;
                        for (; i < wr.size(); i++) {
                            if (wr.get(i).getName().equals(n_)) break;
                        }
                        setEn(wr, sc, i);
                    } else {
                        System.out.println("UID:");
                        int b = sc.nextInt();
                        int i = 0;
                        for (; i < wr.size(); i++) {
                            if (wr.get(i).getUID() == b) break;
                        }
                        setEn(wr, sc, i);

                    }

                }

                case 4 -> {
                    System.out.print("Enter ID of Customer : ");
                    int ID_c = sc.nextInt();
                    int index_c = -1;
                    for (int i = 0; i < cu.size(); i++) {
                        if (cu.get(i).getUID() == ID_c) {
                            index_c = i;
                            break;
                        }
                    }
                    if (index_c == -1)
                        System.out.println(":::::::::WARNING: You have not logged into our System. Please do So by following Instruction 1->1. Follow DOCS to understand.");
                    else {
                        System.out.println("Please Enter the Number of products you are ordering:");
                        int n = sc.nextInt();
                        System.out.println("Please Enter the Name, UID and Count of the products you wish to Order:-");
                        System.out.println("Please Enter it in this format......['Name  UID  Count'] (2 Spaces between each Attribute).");
                        while (n-- > 0) {
                            Entity p = new Entity();
                            p.input("Entity");
                            String a = sc.next();
                            p.setEntity(a.substring(0, a.indexOf(' ')), Integer.parseInt(a.substring(a.indexOf(' ') + 1, a.lastIndexOf(' ') - 1)));
                            cu.get(index_c).getList().put(p, Integer.parseInt(a.substring(a.lastIndexOf(' ') + 1)));
                        }
                    }

                }

                case 5 -> {
                    System.out.print("Enter ID of Customer : ");
                    int ID = sc.nextInt();
                    int index_c = -1;
                    for (int i = 0; i < cu.size(); i++) {
                        if (cu.get(i).getUID() == ID) {
                            index_c = i;
                            break;
                        }
                    }
                    if (index_c == -1) {
                        System.out.println("-------Enter Valid Customer UID!!------");
                    }
                    System.out.print("Enter ID of Product : ");
                    int id = sc.nextInt();
                    int index_p = -1;
                    for (int i = 0; i < pr.size(); i++) {
                        if (pr.get(i).getUID() == id) {
                            index_p = i;
                            break;
                        }
                    }
                    if (index_p == -1) {
                        System.out.println("-------Enter Valid Product!! Such a Product does not Exist in our Database------");
                    }
                    int index_s = -1;
                    for (int i = 0; i < wr.size(); i++) {
                        if (wr.get(i).getZipCode() == cu.get(index_c).getZipCode() && wr.get(i).getInventory().containsKey(pr.get(index_p))) {
                            index_s = i;
                            break;
                        }
                    }
                    int min_Delivery = 1000000;
                    int index_d = -1;
                    for (int i = 0; i < ag.size(); i++) {
                        if (ag.get(i).getZipCode() == cu.get(index_c).getZipCode()) {
                            if (min_Delivery > ag.get(i).getNumber()) {
                                min_Delivery = ag.get(i).getNumber();
                                index_d = i;
                            }
                        }
                    }
                    if (index_d != -1 && index_s != 1) {
                        ag.get(index_d).update_Delivery(1);
                        wr.get(index_s).decInventory(pr.get(index_p));
                        System.out.println("****** Your Order was Processed Successfully !!");
                        System.out.println("Thank you for Shopping with us.");
                    } else {
                        System.out.println("Order Could Not be Processed Successfully !!");
                        System.out.println("Please Try Again Later........");
                    }
                }

                case 6 -> {
                    System.out.println("Please Enter your ID:");
                    int ui = sc.nextInt();
                    int index = -1;
                    for (int i = 0; i < cu.size(); i++) {
                        if (cu.get(i).getUID() == ui) {
                            index = i;
                            break;
                        }
                    }
                    if (index != -1) {
                        System.out.println("Your Name: " + cu.get(index).getName());
                        System.out.println("Your UID: " + cu.get(index).getUID());
                        cu.get(index).print("Customer");
                    }

                }

                case 7 -> {
                    System.out.println("Dear User !! How do you wish find the Warehouse/Shop by ID or Name. Enter UID or Name.....");
                    String ch = sc.next();
                    switch (ch) {
                        case "UID" -> {
                            System.out.println("Enter Name to Find:");
                            String a = sc.next();
                            if (wr.stream().anyMatch(ob -> ob.getName().equals(a))) {
                                wr.stream().filter(ob -> ob.getName().equals(a)).findFirst().get().print("Warehouse");
                            } else {
                                System.out.println(":::::: WARNING: Such a Manufacturer DOES NOT EXIST in our DataBase(Supported by Mongo DB Atlas)");
                            }
                            /**
                             * Thought of Implementing this Fashion Below to Deal with Id/Else in One Go.
                             */
                            //wr.stream().filter(mn->mn.getName().equals(a)).findFirst().orElse(wr.stream().filter(mn->mn.getUID()==Integer.parseInt(a)).findFirst().get()).print("Warehouse");
                        }
                        case "Name" -> {
                            System.out.println("Enter UID to Find:");
                            int a = sc.nextInt();
                            if (wr.stream().anyMatch(ob -> ob.getUID() == a)) {
                                wr.stream().filter(ob -> ob.getUID() == a).findFirst().get().print("Warehouse");
                            } else {
                                System.out.println(":::::: WARNING: Such a Warehouse/Shop DOES NOT EXIST on our Database(Supported by Mongo DB Atlas)");
                            }

                        }
                    }
                }

                case 8 -> {
                    System.out.println("Dear User !! How do you wish find the Manufacturer by ID or Name. Enter UID or Name.....");
                    String c = sc.next();
                    switch (c) {
                        case "UID" -> {
                            System.out.println("Enter Name to Find:");
                            String a = sc.next();
                            if (mn.stream().anyMatch(ob -> ob.getName().equals(a))) {
                                mn.stream().filter(ob -> ob.getName().equals(a)).findFirst().get().print("Manufacturer");
                            } else {
                                System.out.println(":::::: WARNING: Such a Manufacturer DOES NOT EXIST in our DataBase(Supported by Mongo DB Atlas)");
                            }
                        }
                        case "Name" -> {
                            System.out.println("Enter UID to Find:");
                            int a = sc.nextInt();
                            if (mn.stream().anyMatch(ob -> ob.getUID() == a)) {
                                mn.stream().filter(ob -> ob.getUID() == a).findFirst().get().print("Manufacturer");
                            } else {
                                System.out.println(":::::: WARNING: Such a Manufacturer DOES NOT EXIST on our Database(Supported by Mongo DB Atlas)");
                            }

                        }
                    }
                }
            }
            t.print("Task");
            t.ch = sc.nextInt();
        }
        sc.close();
    }
    private static void setEn(ArrayList<Warehouse> wr, Scanner sc, int i) {
        System.out.println("Please Enter the Name and UID of the Product:....");
        System.out.println("Name:");
        String name = sc.next();
        System.out.println("UID:");
        int u = sc.nextInt();
        System.out.println("Please Enter the Count to be added:");
        int a = sc.nextInt();
        Entity e = new Entity();
        e.setEntity(name, u);
        wr.get(i).update(e, a);
    }
}
