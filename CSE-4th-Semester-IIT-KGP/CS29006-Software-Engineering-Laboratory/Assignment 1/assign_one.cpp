#include <iostream>
#include <list>
#include <utility>
#include <vector>
#include <algorithm>

using namespace std;

class Customer {

private:
    string name;
    size_t id;
    static size_t NumCustomer;

public:
    Customer(string name = "NA") {
        this->name = std::move(name);
        this->id = ++NumCustomer;
    }

    ~Customer() {
        this->name = "NA";
        this->id = -1;
    }

    friend ostream &operator<<(ostream &os, const Customer &cust) {
        cout << "** Customer **" << endl;
        cout << "Name: ";
        os << cust.name << " ID: " << cust.id << std::endl;
        cout << std::endl;
        return os;
    }

    friend istream &operator>>(istream &is, Customer &cust) {
        cout << "** Customer **" << endl;
        cout << "Name: ";
        is >> cust.name;
        cout << "ID: ";
        is >> cust.id;
        return is;
    }
};
class ProductItem {
    string title;
    size_t id;
    static size_t NumProductItem;
    float price;
    int copies;

public:
    ProductItem(string title = "NA", float price = 0) {
        this->title = title;
        this->id = 1;
        this->price = price;
        this->copies = 0;
    }

    ~ProductItem() {
        this->title = "NA";
        this->id = ++NumProductItem;
        this->copies = 0;
        this->price = 0;
    }

    friend ostream &operator<<(ostream &os, const ProductItem &pi) {
        cout << "** Product **" << std::endl;
        os << "Title: " << pi.title << " ID: " << pi.id << std::endl;
        os << "Price: " << pi.price << " Copies: " << pi.copies << std::endl;
        cout << std::endl;
        return os;
    }

    friend istream &operator>>(istream &is, ProductItem &pi) {
        cout << "** Product **" << std::endl;
        cout << "Title: ";
        is >> pi.title;
        cout << "ID: ";
        is >> pi.id;
        cout << "Price: ";
        is >> pi.price;
        cout << "Copies: ";
        is >> pi.copies;
        cout << std::endl;
        return is;
    }

    ProductItem &operator*(int a) {
        this->copies += a;
        return *this;
    }

    ProductItem &operator=(ProductItem &pi) {
        if(this != &pi)
        {
            this->title = pi.title;
            this->id = pi.id;
            this->copies = pi.copies;
            this->price = pi.price;
        }
        return *this;
    }
};
class Order {
    int id;
    static size_t NumOrder;
    Customer c;
    vector<ProductItem> prods;

public:
    Order(Customer &in_c)
    {
        this->id = ++NumOrder;
        this->c = in_c;
    }

    ~Order()
    {
        this->id = -1;
        this->c.~Customer();
        this->prods.clear();
    }

    int getid()
    {
        return this->id;
    }

    friend ostream &operator<<(ostream &os, const Order &o)
    {
        cout << "** Order **" << std::endl;
        os << o.c;
        cout << "ID: ";
        os << o.id;
        cout << " Products Size: " << o.prods.size() << std::endl;
        for(int i=0;i<o.prods.size();i++)
            os << o.prods[i];
        cout << std::endl;
        return os;
    }

    friend istream &operator>>(istream &is, Order &o)
    {
        cout << "** Product **" << std::endl;
        cout << "ID: ";
        is >> o.id;
        is >> o.c;
        return is;
    }

    Order &operator+(ProductItem &p)
    {
        this->prods.push_back(p);
        return *this;
    }

    Order &operator=(Order &o)
    {
        if(this != &o)
        {
            this->id = o.id;
            this->c = o.c;
            this->prods = o.prods;
        }
        return *this;
    }
};
class ShoppingBasket
{
     size_t id;
     static size_t NumBasket;
     Customer c;
     list<Order> orders;

 public:
     ShoppingBasket(Customer &in_c)
     {
         this->id = ++NumBasket;
         this->c = in_c;
     }
     ~ShoppingBasket()
     {
         this->id = -1;
         this->c.~Customer();
         this->orders.clear();
     }
     friend ostream &operator<<(ostream &os, const ShoppingBasket &sb)
     {
         cout << "** Shopping Basket **" << std::endl;
         os << sb.c;
         cout << "Shopping Basket ID: ";
         os << sb.id;
         cout << " Order Size: " << sb.orders.size() << std::endl;
         for(auto it=sb.orders.begin();it != sb.orders.end();it++)
             cout << it.operator*();
         cout << std::endl;
         return os;
     }
     friend istream &operator>>(istream &is, ShoppingBasket &sb)
     {
         cout << "** Shopping Basket **" << std::endl;
         cout << "ID: ";
         is >> sb.id;
         is >> sb.c;
         return is;
     }
     ShoppingBasket &operator+(Order &p)
     {
        this->orders.push_back(p);
        return *this;
     }
     ShoppingBasket &operator-(int orderid)
     {
         this->orders.remove_if([&orderid](Order n){return n.getid()==orderid;});
         return *this;
     }
     ShoppingBasket &operator=(ShoppingBasket &sb)
     {
         if(this != &sb )
         {
             this->id = sb.id;
             this->c = sb.c;
             this->orders.clear();
             this->orders.assign(sb.orders.begin(),sb.orders.end());
         }
         return *this;
     }

 };

size_t Customer::NumCustomer = 0;
size_t ProductItem::NumProductItem = 0;
size_t Order::NumOrder = 0;
size_t ShoppingBasket::NumBasket = 0;

int main()
{
    //create a customer
    Customer *c = new Customer("Nikhil");
    // create a product
    ProductItem *p = new ProductItem("Something");
    // create am Order
    Order *o = new Order(*c);
    // add 10 copies of p to order o
    Order &oref = *o;
    oref = oref + *p * 10;
    // create a shopping basket
    ShoppingBasket *s = new ShoppingBasket(*c);
    ShoppingBasket &shop = *s;
    shop = shop + oref;
    shop = shop - oref.getid();
    return 0;
}
