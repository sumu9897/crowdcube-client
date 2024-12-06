# 🚀 **Crowdcube: A Crowdfunding Platform**

## 🎯 **Website Overview**

Crowdcube is a dynamic crowdfunding platform where individuals can create, support, and contribute to various projects, startups, and personal causes. Whether it's raising funds for creative ideas, personal needs, or business ventures, Crowdcube empowers people to bring ideas to life by inviting others to contribute financially.

---

## 🔗 **Live Site URL**
[**Live Website**](https://crowdcube-934d7.web.app/)

---

## 📜 **Project Features**

- **User Authentication**:  
  Secure login and registration with **email/password**, **Google**, and **GitHub authentication**.

- **Campaign Management**:  
  Users can **Add, Update, and Delete** their campaigns seamlessly.

- **Dynamic Campaign Listings**:  
  Show active campaigns on the **Home Page** and redirect users to detailed campaign pages.

- **Donation Integration**:  
  Easily contribute to campaigns with a simple **Donate** button on each campaign page.

- **Responsive Design**:  
  Fully functional on **mobile, tablet, and desktop screens**.

---

## 📚 **Tech Stack**

- **Frontend**: React.js, React Router, Tailwind CSS  
- **Backend**: Node.js, Express  
- **Database**: MongoDB  
- **Authentication**: Firebase, OAuth (Google)  
- **Deployment**: Firebase (Client-side), Vercel (Server-side)  

---

## 📝 **Key Functionalities**

### 🔹 **Navbar**  
- Contains **Home, All Campaign, My Campaign, My Donations**  
- **Conditional Login and Register Buttons** depending on user authentication state  
- Displays **user image and name** on hover for a personalized experience  

### 🔹 **Home Page**  
- Contains a **banner slider** with meaningful information  
- Displays **6 active campaign cards** dynamically fetched from MongoDB  
- Includes **Recommended Campaigns** and **Featured Ideas** sections  

### 🔹 **All Campaign Page**  
- A detailed view showing **campaigns added by all users**  
- Includes a **"See More" button** for navigating to the campaign details page  
- **Sort functionality** for ascending or descending donation amounts  

### 🔹 **Details Page**  
- Displays **campaign information, user contributions**, and donation options  
- Prevents donations for campaigns where the **deadline has already passed**  

### 🔹 **Protected Routes**  
- Includes **Add Campaign, My Campaign, My Donations**  
- Only accessible to **authenticated users**  

### 🔹 **Toast Notifications**  
- Custom notifications for **success and error messages** ensure a smooth user experience  

---

## 📂 **Repository Links**

### 🔹 **Client-Side**  
[**GitHub Client-Side Repository**](https://github.com/programming-hero-web-course2/b10-a10-client-side-sumu9897)

### 🔹 **Server-Side**  
[**GitHub Server-Side Repository**](https://github.com/programming-hero-web-course2/b10-a10-server-side-sumu9897)
