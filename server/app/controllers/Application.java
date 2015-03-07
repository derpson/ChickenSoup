package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result home() {
        return ok(home.render());
    }

    public static Result addInfection() {
        JsonNode json = request().body().asJson();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {
        }
        return ok();
    }

}
