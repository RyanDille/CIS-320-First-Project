package edu.simpson.dille;

import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Pattern;

@WebServlet(name = "NameListEdit")
public class NameListEdit extends HttpServlet {

    private Pattern first;
    private Pattern last;
    private Pattern phone;
    private Pattern email;
    private Pattern birthday;
    /**
     * Our constructor
     */
    public NameListEdit() {

        String test = ("^[\\w'\\-,.][^0-9_!¡?÷?¿/\\\\+=@#$%ˆ&*(){}|~<>;:[\\]]{2,}$");

        // --- Compile and set up all the regular expression patterns here ---
        first = Pattern.compile("^[a-zA-Z]+$");
        last = Pattern.compile("^[a-zA-Z]+$");
        phone = Pattern.compile("^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$");
        email = Pattern.compile("^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$");
        birthday = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");
    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        boolean done = false;
        java.io.BufferedReader in = request.getReader();
        String requestString = new String();
        for (String line; (line = in.readLine()) != null; requestString += line) {
            if (line.contains("id")) {
                done = true;
            }

        };

        Gson gson = new Gson();
        Person fromJson = gson.fromJson(requestString, Person.class);

        if (first.matcher(fromJson.getFirst()).find() && last.matcher(fromJson.getLast()).find() &&
                phone.matcher(fromJson.getPhone()).find() && email.matcher(fromJson.getEmail()).find() &&
                birthday.matcher(fromJson.getBirthday()).find()) {
            System.out.println(done);
            if (done) {
                PersonDAO.editPerson(fromJson);
            }
            else {
                PersonDAO.addPerson(fromJson);
            }
        }

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    //private String firstName;
    //public String getFieldName() { return firstName; }
    //public void setFieldName(String firstName) { this.firstName = firstName; }



}

