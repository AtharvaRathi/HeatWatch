# State Transition Test Cases (0-Switch and 1-Switch)

In STQA, deriving test cases from the State Diagram is essential. You can add a summary of this to your poster to prove the methodology is applied correctly.

### 0-Switch Coverage (Testing single transitions)
These test cases verify that moving exactly one step at a time works correctly.

| Test Case ID | Initial State | Input Trigger | Expected Final State | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Normal Weather | Temp = 36°C (T1) | Yellow Advisory | [   ] |
| **TC-02** | Yellow Advisory | Temp = 42°C (T2) | Orange Alert | [   ] |
| **TC-03** | Orange Alert | Temp = 46°C (T3) | Red Warning | [   ] |
| **TC-04** | Red Warning | Temp = 43°C (T4) | Orange Alert | [   ] |
| **TC-05** | Orange Alert | Temp = 38°C (T5) | Yellow Advisory | [   ] |
| **TC-06** | Yellow Advisory | Temp = 33°C (T6) | Normal Weather | [   ] |

---

### 1-Switch Coverage (Testing sequences of 2 transitions)
These test cases verify that a sequence of two state changes works without the system crashing or getting stuck.

| Test Case ID | Initial State | Input Sequence | Expected Final State | System Response |
| :--- | :--- | :--- | :--- | :--- |
| **TC-07** | Normal | T1 (36°C) -> T2 (41°C) | Orange Alert | Triggers Yellow, then immediately Orange |
| **TC-08** | Yellow | T2 (42°C) -> T3 (47°C) | Red Warning | Triggers Orange, then immediately Red |
| **TC-09** | Orange | T5 (38°C) -> T6 (34°C) | Normal | Clears Orange, issues Yellow, then Normal |

*(Pro-Tip for Poster: You can format these tables with nice colors matching the alert levels! e.g., Row 1 is Yellow, Row 2 is Orange, Row 3 is Red)*
