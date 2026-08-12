package com.hireforge.hireforge_ai.resume.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class GeminiRequest {

    @JsonProperty("contents")
    private List<Content> contents;

    @JsonProperty("generationConfig")
    private GenerationConfig generationConfig;

    public GeminiRequest(List<Content> contents, GenerationConfig generationConfig) {
        this.contents = contents;
        this.generationConfig = generationConfig;
    }

    public List<Content> getContents() { return contents; }
    public void setContents(List<Content> contents) { this.contents = contents; }
    public GenerationConfig getGenerationConfig() { return generationConfig; }
    public void setGenerationConfig(GenerationConfig generationConfig) { this.generationConfig = generationConfig; }

    public static class Content {
        @JsonProperty("parts")
        private List<Part> parts;

        public Content(List<Part> parts) { this.parts = parts; }
        public List<Part> getParts() { return parts; }
        public void setParts(List<Part> parts) { this.parts = parts; }
    }

    public static class Part {
        @JsonProperty("text")
        private String text;

        public Part(String text) { this.text = text; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
    }

    public static class GenerationConfig {
        @JsonProperty("temperature")
        private double temperature;

        public GenerationConfig(double temperature) { this.temperature = temperature; }
        public double getTemperature() { return temperature; }
        public void setTemperature(double temperature) { this.temperature = temperature; }
    }
}