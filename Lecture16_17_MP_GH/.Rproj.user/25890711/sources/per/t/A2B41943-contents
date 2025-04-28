# Load required libraries
library(shiny)
library(ggplot2)

# Load the EML data
tryCatch({
    load("dat/eml.rda")
    if (!exists("eml")) {
        stop("eml data not found in eml.rda file")
    }
}, error = function(e) {
    message("Error loading data: ", e$message)
    stop(e)
})

# Get unique depths for the slider
depths <- sort(unique(eml$Depth))

# Define UI for application
ui <- fluidPage(
    # Application title
    titlePanel("Plotting EML Data"),
    
    # Sidebar with a slider input for number of bins
    sidebarLayout(
        sidebarPanel(
            # X-axis variable selector
            selectInput("xvar", 
                       "Select X-axis variable:",
                       choices = c("Temp", "Cond", "pH", "DO"),
                       selected = "Temp"),
            
            # Y-axis variable selector
            selectInput("yvar",
                       "Select Y-axis variable:",
                       choices = c("Temp", "Cond", "pH", "DO"),
                       selected = "Cond"),
            
            # Depth selector
            sliderInput("depth",
                       "Select Depth (m):",
                       min = min(depths),
                       max = max(depths),
                       value = 0,
                       step = 0.5)
        ),
        
        mainPanel(
            plotOutput("plot1")
        )
    )
)

# Define server logic required to draw a histogram
server <- function(input, output) {
    output$plot1 <- renderPlot({
        # Filter data for selected depth
        depth_data <- eml[eml$Depth == input$depth, ]
        
        # Create ggplot
        ggplot(depth_data, aes_string(x = input$xvar, y = input$yvar)) +
            geom_point(alpha = 0.3, color = "blue") +
            labs(x = paste(input$xvar, "at", input$depth, "m depth"),
                 y = paste(input$yvar, "at", input$depth, "m depth"),
                 title = paste(input$yvar, "vs", input$xvar, "at", input$depth, "m depth")) +
            theme_minimal()
    })
}

# Run the application 
shinyApp(ui = ui, server = server)