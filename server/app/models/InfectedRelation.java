package models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class InfectedRelation {
    public static Map<Person, ArrayList<Person>> table = new HashMap<Person, ArrayList<Person>>();

    public static void addInfection(long infectorId, long infectedId, String infectorName, String infectedName) {
        Person infector = new Person(infectorId, infectedName);
        Person infected = new Person(infectedId, infectedName);
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

}
