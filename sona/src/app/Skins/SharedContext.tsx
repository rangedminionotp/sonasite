import React, { createContext, useContext, useState } from "react";
const SkinContext = createContext<SlackContextType | null>(null);

export default SkinContext;
