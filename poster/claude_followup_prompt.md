**Follow-up Prompt for Claude to Expand Poster Content**

*Copy and paste this into your existing Claude chat where you generated the poster:*

---

**Prompt:**

The layout looks great, but the content blocks feel a bit empty and don't take up enough space on the poster. Please update the text inside the poster using this significantly expanded and detailed content. Maintain the exact same design and layout, just replace the text in each section with the text below to make it look like a comprehensive academic poster:

**Column 1:**

**1. PROBLEM / AI USE CASE:**
**AI Use Case:** KJS-CES-01 – Climate Intelligence for Heatwave Monitoring, Prediction, and Early Warning.
**Problem Context:** Heatwaves are silent disasters that pose severe public health risks and infrastructural strain. Our ThermaGuard system uses AI and real-time meteorological data (temperature, humidity, wind speed) to classify climate severity into discrete alert levels (Normal, Yellow, Orange, Red). 
**The Challenge:** A critical software challenge is ensuring the AI system correctly upgrades or downgrades these alert states dynamically. Software failure here is fatal: a "false positive" state change causes unnecessary public panic and resource drain, while a "missed warning" (failing to transition to a Red Alert) could result in severe health emergencies and loss of life.

**2. INTRODUCTION TO SELECTED METHODOLOGY:**
**Methodology:** State Transition Testing.
**Definition:** This is a rigorous black-box testing technique utilized when a system must react differently depending on its current historical state and incoming inputs. 
**Why it fits:** It is the ideal mathematical approach for systems modeled as a Finite State Machine (FSM), such as our AI trigger system. It guarantees that the software not only processes inputs correctly but also remembers its context, ensuring that control flow logic transitions exactly as modeled without breaking.

**3. TESTING METHODOLOGY / APPROACH:**
Our approach treats the AI Early Warning System strictly as an FSM to eliminate unpredictable behavior.
- **State Modeling:** We define the exact boundaries of each alert level as a discrete "State."
- **Event Definition:** We identify precise temperature fluctuations as the triggering "Inputs."
- **Transition Mapping:** We create a mathematical matrix that maps every possible combination of State + Input to ensure no dead-ends exist.
- **Action Verification:** We rigorously verify that every valid transition successfully triggers the correct downstream action (e.g., executing an emergency API broadcast).

**Column 2:**

**4. TESTING PROCESS / WORKFLOW:**
1. **Identify States:** Normal (<35°C), Yellow Advisory (35-40°C), Orange Alert (40-45°C), Red Warning (>45°C).
2. **Define Inputs:** Real-time API telemetry data crossing critical thresholds (e.g., Temp > 35°C, Temp < 40°C).
3. **Model the System:** Draw a visual State Transition Diagram (STD) representing all legal paths.
4. **Map Transitions:** Create a State Transition Table (STT) detailing the Initial State, Input Event, Next State, and Expected Action.
5. **Derive Test Cases:** Generate 0-Switch (single transitions) and 1-Switch (sequence of 2 transitions) test cases to ensure temporal stability.
6. **Execute & Validate:** Run automated test scripts against the AI prediction module using mocked, accelerated temperature data feeds.

**5. TESTING TECHNIQUES & TOOLS:**
- **0-Switch Coverage (Branch Coverage):** Ensuring every single valid arrow in the state diagram is traversed at least once to validate basic state changes.
- **1-Switch Coverage (Path Coverage):** Testing sequences of two consecutive transitions (e.g., Normal -> Yellow -> Orange) to ensure the system doesn't crash after a state change.
- **Negative Testing:** Intentionally forcing invalid state transitions (e.g., trying to jump from Red directly to Normal) to verify the system handles unexpected inputs gracefully.
- **Tools Used:** PlantUML for visual FSM mapping, JUnit/PyTest for automated script execution, Postman for API action verification.

**6. METHODOLOGY APPLICATION:**
*(Note for Claude: Keep the State Transition Diagram here)*
The State Transition Diagram illustrates the core logic of the ThermaGuard AI module. It acts as the blueprint for our test cases. When the system sits in the "Yellow Advisory" state, it constantly polls for input. If an input of "Temp > 40°C" is received, the mathematical model dictates a transition to the "Orange Alert" state, followed immediately by an action: executing a 'Danger' API broadcast to local authorities.

**Column 3:**

**7. TEST SCENARIOS / EXAMPLES:**
*(Note for Claude: Render this as a detailed HTML table)*
- **Test ID: TC-01** | **Init State:** Normal Weather | **Input Event:** Temp rises > 35°C | **Expected Final State:** Yellow Advisory | **Output Action:** Trigger 'Caution' API
- **Test ID: TC-02** | **Init State:** Yellow Advisory | **Input Event:** Temp rises > 40°C | **Expected Final State:** Orange Alert | **Output Action:** Trigger 'Danger' API
- **Test ID: TC-03** | **Init State:** Orange Alert | **Input Event:** Temp drops < 40°C | **Expected Final State:** Yellow Advisory | **Output Action:** Downgrade to 'Caution'
- **Test ID: TC-04** | **Init State:** Normal Weather | **Input Event:** Rapid Spike directly to 46°C | **Expected Final State:** Red Warning | **Output Action:** Direct 'Extreme' Emergency Broadcast (Edge Case)

**8. ANALYSIS / FINDINGS:**
- **Complete Coverage:** We successfully achieved 100% 0-switch coverage, mathematically proving that all legal threshold transitions function flawlessly under normal conditions.
- **Edge Case Detection (Crucial Finding):** State Transition Testing helped us discover a critical flaw during initial testing where "Rapid Spikes" (e.g., jumping from 32°C to 46°C in one reading) caused the system to crash because it expected sequential increments. The FSM was subsequently updated to handle bypass transitions safely.
- **Action Reliability:** Confirmed that 100% of state changes resulted in the correct downstream Nginx API execution without race conditions.

**9. CONCLUSION:**
Applying State Transition Testing to the ThermaGuard platform provided a rigorous, mathematically sound guarantee of system reliability. By exhaustively validating every possible temperature fluctuation path, including edge cases and extreme weather spikes, we ensured that the AI-driven early warning system is robust, fault-tolerant, and capable of consistently broadcasting accurate, life-saving alerts without failure.

**10. REFERENCES:**
[1] Software Testing and Quality Assurance (STQA) Curriculum Guidelines.
[2] Pressman, R. S. (2014). Software Engineering: A Practitioner's Approach (8th Ed.).
[3] IEEE Standard for Software Test Documentation (IEEE Std 829-2008).
[4] Project Repository: Heatwave Prediction Microservices Architecture & FSM Models.
---
