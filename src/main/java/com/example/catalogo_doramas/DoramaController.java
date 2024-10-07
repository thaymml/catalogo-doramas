package com.example.catalogo_doramas;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import java.io.InputStreamReader;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class DoramaController {
    
    @GetMapping("/")
    public String home() {
        return "main";
    }

    @GetMapping("/index.html")
    public String index(Model model) throws Exception {
        List<Dorama> doramas = loadDoramas();
        model.addAttribute("doramas", doramas);
        return "index";
    }

    @GetMapping("/dorama/{id}")
    public String details(@PathVariable int id, Model model) throws Exception {
        List<Dorama> doramas = loadDoramas();
        Dorama selectedDorama = doramas.stream()
                .filter(d -> d.getId() == id)
                .findFirst()
                .orElse(null);

        model.addAttribute("dorama", selectedDorama);
        return "details";
    }

    private List<Dorama> loadDoramas() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(new InputStreamReader(
                        getClass().getResourceAsStream("/json/doramas.json")),
                mapper.getTypeFactory().constructCollectionType(List.class, Dorama.class));
    }
}
