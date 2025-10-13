package controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import entity.User;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import util.HibernateUtil;

@MultipartConfig
@WebServlet(name = "UserSignIn", urlPatterns = {"/UserSignIn"})
public class UserSignIn extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action"); // Determine if it's a sign-in or sign-up request
        Gson gson = new Gson();
        JsonObject responseObject = new JsonObject();
        responseObject.addProperty("status", false);

        if ("signIn".equals(action)) {
            // Handle sign-in
            String countryCode = request.getParameter("countryCode");
            String contactNo = request.getParameter("contactNo");

            if (countryCode == null || countryCode.isEmpty()) {
                responseObject.addProperty("message", "Country code is required");
            } else if (contactNo == null || contactNo.isEmpty()) {
                responseObject.addProperty("message", "Contact number is required");
            } else {
                Session session = HibernateUtil.getSessionFactory().openSession();
                Criteria criteria = session.createCriteria(User.class);
                criteria.add(Restrictions.eq("countryCode", countryCode));
                criteria.add(Restrictions.eq("contactNo", contactNo));
                User user = (User) criteria.uniqueResult();
                session.close();

                if (user != null) {
                    responseObject.addProperty("status", true);
                    responseObject.add("user", gson.toJsonTree(user));
                    responseObject.addProperty("message", "Sign-in successful");
                } else {
                    responseObject.addProperty("message", "User not found");
                }
            }
        } else {
            responseObject.addProperty("message", "Invalid action");
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(responseObject));
    }
}