import matplotlib.pyplot as plt
import numpy as np
import os

# Create images folder
os.makedirs('images', exist_ok=True)

# ----------------------------------------------------
# Graph 1: Heatwave Thresholds & State Transitions (Line Graph)
# ----------------------------------------------------
plt.figure(figsize=(10, 6))

# Mock data for a day
hours = np.arange(0, 24)
temperatures = [
    28, 27, 26, 26, 27, 29, 32, 35, 38, 41, 44, 46,
    47, 46, 45, 43, 40, 37, 34, 32, 30, 29, 28, 27
]

plt.plot(hours, temperatures, marker='o', color='black', linewidth=2, label='Recorded Temp')

# Add threshold areas
plt.axhspan(0, 35, facecolor='green', alpha=0.2, label='Normal (<35°C)')
plt.axhspan(35, 40, facecolor='yellow', alpha=0.3, label='Yellow Advisory (35-40°C)')
plt.axhspan(40, 45, facecolor='orange', alpha=0.3, label='Orange Alert (40-45°C)')
plt.axhspan(45, 55, facecolor='red', alpha=0.3, label='Red Warning (>45°C)')

plt.title('State Transition Triggers: Temperature vs Time', fontsize=16, fontweight='bold')
plt.xlabel('Time (Hours)', fontsize=12)
plt.ylabel('Temperature (°C)', fontsize=12)
plt.xticks(np.arange(0, 24, 2))
plt.yticks(np.arange(20, 55, 5))
plt.grid(True, linestyle='--', alpha=0.7)
plt.legend(loc='upper left')

plt.tight_layout()
plt.savefig('images/1_Temperature_Thresholds_Graph.png', dpi=300)
print("Generated Temperature_Thresholds_Graph.png")


# ----------------------------------------------------
# Graph 2: State Transition Testing Coverage (Bar Chart)
# ----------------------------------------------------
plt.figure(figsize=(8, 6))

categories = ['0-Switch (Single)', '1-Switch (Sequence)', 'Edge Cases (Spikes)', 'Invalid Triggers']
coverage_percent = [100, 100, 100, 100]
test_cases_count = [8, 12, 4, 3]

# Create bar chart with twin axis
fig, ax1 = plt.subplots(figsize=(9, 6))

color = 'tab:blue'
ax1.set_xlabel('Testing Scenario Types', fontsize=12)
ax1.set_ylabel('Number of Test Cases', color=color, fontsize=12)
bars = ax1.bar(categories, test_cases_count, color=['#4caf50', '#2196f3', '#ff9800', '#f44336'])
ax1.tick_params(axis='y', labelcolor=color)

# Add value labels on top of bars
for bar in bars:
    yval = bar.get_height()
    ax1.text(bar.get_x() + bar.get_width()/2, yval + 0.2, int(yval), ha='center', va='bottom', fontweight='bold')

ax2 = ax1.twinx()  # instantiate a second axes that shares the same x-axis
color = 'tab:green'
ax2.set_ylabel('Coverage (%)', color=color, fontsize=12)
ax2.plot(categories, coverage_percent, color=color, marker='D', markersize=8, linewidth=2, linestyle='--')
ax2.tick_params(axis='y', labelcolor=color)
ax2.set_ylim(80, 105)

plt.title('State Transition Test Coverage Analysis', fontsize=16, fontweight='bold')
fig.tight_layout()

plt.savefig('images/2_Test_Coverage_Analysis.png', dpi=300)
print("Generated Test_Coverage_Analysis.png")
