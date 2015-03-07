package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import models.InfectionRelation;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result home() {
        return ok(home.render());
    }

    public static Result login() {
        return ok(login.render());
    }

    public static Result addInfection() {
        System.out.println("WHOOOOO");
        Http.Request req = request();
        Http.RequestBody body = req.body();
        System.out.println(body);
        JsonNode json = body.asJson();
        if (json == null) {
            return badRequest("Expecting Json data");
        } else {
            long infectorId = json.findPath("infectorId").asLong();
            long infectedId = json.findPath("infectedId").asLong();
            String infectorName = json.findPath("infectorName").textValue();
            String infectedName = json.findPath("infectedName").textValue();
            InfectionRelation.addInfection(infectorId, infectedId, infectorName, infectedName);
        }
        return ok("");
    }

}
