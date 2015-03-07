package models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class InfectionRelation {
    public static Map<Person, ArrayList<Person>> table = new HashMap<>();

    public static void addInfection(long infectorId, long infectedId, String infectorName, String infectedName) {
        Person infector = new Person(infectorId, infectorName);
        Person infected = new Person(infectedId, infectedName);
        System.out.println(String.format("%s infected %s", infectorName, infectedName));
        if (table.containsKey(infector)) {
            ArrayList<Person> infectorVictims = table.get(infector);
            infectorVictims.add(infected);
            table.put(infector, infectorVictims);
        } else {
            ArrayList<Person> infectorVictims = new ArrayList<>();
            infectorVictims.add(infected);
            table.put(infector, infectorVictims);
        }
    }

    public static String retrieveInfectionGraph(long id) {
        return "";
    }

}
