# Poster Title
**Tracking Climate Alerts: State Transition Testing of a Heatwave Monitoring Platform**

## 1. Introduction
The **Climate Intelligence for Heatwave Monitoring** system is an AI-driven early warning platform designed to detect and broadcast heatwave severity. As temperatures fluctuate, the system transitions between different safety states (Normal, Yellow Advisory, Orange Alert, Red Warning). 

In Software Testing and Quality Assurance (STQA), **State Transition Testing** is a black-box testing technique used to validate that the system correctly transitions from one state to another based on specific inputs (temperature changes) and triggers the correct outputs (alerts).

## 2. Why State Transition Testing?
- **High Coverage:** Ensures every possible alert transition (both valid and invalid) is tested.
- **Critical Safety:** Prevents fatal flaws, such as the system remaining in a "Normal" state during a "Red Warning" temperature spike.
- **Visual Mapping:** Provides clear state diagrams and transition tables that make debugging AI triggers easier.

## 3. System States & Inputs
### Defined States (S):
* **S1:** Normal Weather (Safe)
* **S2:** Yellow Advisory (Caution)
* **S3:** Orange Alert (Danger)
* **S4:** Red Warning (Extreme Danger)

### Defined Inputs / Triggers (I):
* **T1:** Temp rises above 35°C
* **T2:** Temp rises above 40°C
* **T3:** Temp rises above 45°C
* **T4:** Temp drops below 45°C
* **T5:** Temp drops below 40°C
* **T6:** Temp drops below 35°C

## 4. Conclusion
By utilizing State Transition Testing, we mathematically guarantee that the Climate Intelligence platform will correctly broadcast the appropriate heatwave alert under any temperature fluctuation, ensuring public safety and system reliability.
