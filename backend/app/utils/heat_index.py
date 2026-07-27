def calculate_heat_index(temp_c: float, rh: float) -> float:
    """
    Calculate heat index using Rothfusz Regression.
    Inputs:
    - temp_c: Temperature in Celsius
    - rh: Relative humidity in percentage (0-100)
    Returns:
    - Heat Index in Celsius
    """
    # Convert C to F
    temp_f = (temp_c * 9/5) + 32

    # Steadman simple formula for HI < 80°F
    if temp_f < 80:
        hi_f = 0.5 * (temp_f + 61.0 + ((temp_f - 68.0) * 1.2) + (rh * 0.094))
    else:
        # Rothfusz full regression
        hi_f = (-42.379 + 2.04901523*temp_f + 10.14333127*rh
                - 0.22475541*temp_f*rh - 6.83783e-3*temp_f**2
                - 5.481717e-2*rh**2 + 1.22874e-3*temp_f**2*rh
                + 8.5282e-4*temp_f*rh**2 - 1.99e-6*temp_f**2*rh**2)

    # Convert back to C
    hi_c = (hi_f - 32) * 5/9
    return round(hi_c, 2)
