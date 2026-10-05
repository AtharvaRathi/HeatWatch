# State Transition Diagram

This is the main flowchart for your poster. It visually represents how the system moves from one state to another based on temperature triggers.

```mermaid
stateDiagram-v2
    direction LR
    
    Normal : Normal Weather (< 35°C)
    Yellow : Yellow Advisory (35-40°C)
    Orange : Orange Alert (40-45°C)
    Red : Red Warning (> 45°C)

    [*] --> Normal : System Start
    
    Normal --> Yellow : T1 (Temp > 35°C)
    Yellow --> Normal : T6 (Temp < 35°C)
    
    Yellow --> Orange : T2 (Temp > 40°C)
    Orange --> Yellow : T5 (Temp < 40°C)
    
    Orange --> Red : T3 (Temp > 45°C)
    Red --> Orange : T4 (Temp < 45°C)
    
    %% Extreme Jumps (Invalid or Edge Cases)
    Normal --> Orange : Rapid Temp Spike > 40°C
    Yellow --> Red : Rapid Temp Spike > 45°C
```

*(Note: When you view this file in a Markdown viewer or copy the code into a mermaid live editor like https://mermaid.live, it will generate a beautiful State Transition Flowchart you can screenshot for your poster!)*
