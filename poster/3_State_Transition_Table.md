# State Transition Table

A core component of State Transition Testing is the **Transition Table**. You can create a visually appealing table on your poster using this data.

| Current State (CS) | Input Condition / Event (I) | Next State (NS) | Output Action (O) |
| :--- | :--- | :--- | :--- |
| **S1 (Normal)** | T1: Temp rises above 35°C | **S2 (Yellow)** | Trigger 'Caution' API Broadcast |
| **S2 (Yellow)** | T2: Temp rises above 40°C | **S3 (Orange)** | Trigger 'Danger' API Broadcast |
| **S3 (Orange)** | T3: Temp rises above 45°C | **S4 (Red)** | Trigger 'Extreme Danger' Emergency API |
| **S4 (Red)** | T4: Temp drops below 45°C | **S3 (Orange)** | Downgrade to 'Danger' Alert |
| **S3 (Orange)** | T5: Temp drops below 40°C | **S2 (Yellow)** | Downgrade to 'Caution' Advisory |
| **S2 (Yellow)** | T6: Temp drops below 35°C | **S1 (Normal)** | Clear Alerts, send 'Safe' Broadcast |
| **S1 (Normal)** | Rapid Temp Spike > 40°C | **S3 (Orange)** | Trigger 'Danger' API Broadcast directly |

*This table guarantees that we have mapped every legal and expected transition within the system.*
