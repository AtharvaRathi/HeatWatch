**Prompt for Claude to Generate the STQA Poster**

Copy and paste the following prompt into Claude (along with the image of your poster format if you want it to match a specific style):

---

**Prompt:**

I need to create an academic poster for my "Software Testing and Quality Assurance (STQA)" subject. Please generate a complete React component (using Tailwind CSS) or an HTML/CSS file that is structured as a 3-column academic poster in A4 portrait format.

Here are the specific requirements and content to include based on my assignment rubric:

**1. Header Details:**
- **Logos:** Left side should have a placeholder for "Somaiya Vidyavihar University / K J Somaiya College of Engineering" logo. Right side should have a placeholder for the "Somaiya Trust" logo.
- **Center Text:** 
  - Somaiya Vidyavihar University (White)
  - K J Somaiya School of Engineering (Yellow/Gold)
  - Department of Information Technology (White)
- **Header Background:** Dark Red/Maroon (#980000).

**2. Subheader & Course Info:**
- **Poster Title:** Tracking Climate Alerts: State Transition Testing of a Heatwave Monitoring Platform (in a bordered box).
- **Course:** Software Testing and Quality Assurance (STQA) | Poster Presentation

**3. Student & Faculty Info:**
- **Group Members:**
  - Aayush Solanke (16010423004)
  - Atharva Rathi (16010423022)
  - Aayush Kadam (16010423003)
- **Class:** LY B.Tech IT | Div: A | Batch: __
- **Faculty In-charge:** Prof. Poonam Narkhede / Dr. Ankita Nagmothe

**4. Poster Content (3-Column Layout):**
Please use this exact content and format the sections with dark red headers and light gray/white backgrounds. 

**Column 1:**
*   **1. PROBLEM / AI USE CASE:**
    *   **AI Use Case:** KJS-CES-01 – Climate Intelligence for Heatwave Monitoring, Prediction, and Early Warning.
    *   **Problem:** Heatwaves pose severe public health risks. The system uses AI and weather data to classify climate severity into discrete alert levels (Normal, Yellow, Orange, Red). A critical challenge is ensuring the system correctly upgrades or downgrades these alert states without false positives or missed warnings.
*   **2. INTRODUCTION TO SELECTED METHODOLOGY:**
    *   **Methodology:** State Transition Testing.
    *   It is a black-box testing technique used when a system must react differently depending on its current state and inputs. Ideal for systems modeled as a Finite State Machine (FSM).
*   **3. TESTING METHODOLOGY / APPROACH:**
    *   The approach involves modeling the AI Early Warning System as an FSM. We treat the system's current alert level as its "State" and the changing temperature thresholds as the "Inputs/Events." Focus is on verifying legal transitions, blocking illegal transitions, and triggering API broadcast "Actions."

**Column 2:**
*   **4. TESTING PROCESS / WORKFLOW:**
    *   1. **Identify States:** Normal, Yellow Advisory, Orange Alert, Red Warning.
    *   2. **Define Inputs:** Temperature fluctuations crossing critical thresholds (35°C, 40°C, 45°C).
    *   3. **Model the System:** Draw a State Transition Diagram.
    *   4. **Map Transitions:** Create a State Transition Table.
    *   5. **Derive Test Cases:** Generate 0-Switch and 1-Switch test cases.
    *   6. **Execute & Validate:** Run tests against AI prediction module.
*   **5. TESTING TECHNIQUES & TOOLS:**
    *   **0-Switch Coverage:** Testing every individual valid state transition.
    *   **1-Switch Coverage:** Testing sequences of two consecutive transitions.
    *   **Tools:** State Diagrams for visual mapping; Black-box functional testing techniques.
*   **6. METHODOLOGY APPLICATION:**
    *   *(Note for Claude: Please add an inline SVG State Transition Diagram showing the states: Normal, Yellow, Orange, and Red, and the transitions between them based on temperature inputs.)*
    *   Applied to the core AI advisory module. For example, if currently in a "Yellow Advisory" state, an input of "Temp rises above 40°C" must transition the system to an "Orange Alert" and trigger a 'Danger' API broadcast. 

**Column 3:**
*   **7. TEST SCENARIOS / EXAMPLES:**
    *   *(Note for Claude: Render this as a clean HTML table inside the poster)*
    *   **Init State:** Normal Weather | **Input:** Rises > 35°C | **Final State:** Yellow Advisory
    *   **Init State:** Yellow Advisory | **Input:** Rises > 40°C | **Final State:** Orange Alert
    *   **Init State:** Orange Alert | **Input:** Drops < 40°C | **Final State:** Yellow Advisory
    *   **Init State:** Normal Weather | **Input:** Rapid Spike > 42°C | **Final State:** Orange Alert (Edge Case)
*   **8. ANALYSIS / FINDINGS:**
    *   **High Coverage:** Successfully mapped 100% of the legal threshold transitions.
    *   **Edge Case Detection:** Highlighted the need to handle "Rapid Spikes" (e.g., temperatures jumping from 34°C directly to 46°C without hitting middle states).
    *   **Reliability:** Validated that backend microservices correctly broadcast appropriate API calls upon state changes.
*   **9. CONCLUSION:**
    *   Applying State Transition Testing provides a mathematical guarantee of reliability. By rigorously validating every temperature fluctuation path, we ensure the AI-driven system consistently broadcasts accurate, life-saving alerts without failure.
*   **10. REFERENCES:**
    *   [1] Software Testing and Quality Assurance (STQA) Curriculum Guidelines.
    *   [2] Pressman, R. S. (2014). Software Engineering: A Practitioner's Approach.
    *   [3] Project Repository: Heatwave Prediction Microservices Architecture.

**Design Requirements:**
- Make sure the font is clean and readable (e.g., Roboto or Inter).
- Ensure the layout is a CSS Grid or Flexbox that mirrors a standard 3-column academic poster structure.
- Ensure the table and diagrams fit cleanly within their respective columns.
---
