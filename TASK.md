Multi-column Kanban board system with configurable columns and diverse card content. Each column has a unique name, card counter, and header background color (light shades). Cards are displayed in English with varied content: titles up to 100 characters, optional dates with urgency indicators, optional labels and milestones (with different milestone types), and optional subtasks (1-20 items when present).

Data structure should be separated into configuration files: columns configuration (names, colors, order) and cards data (distributed across columns). The system must support multiple columns rendered dynamically from configuration, with cards filtered and assigned to their respective columns. Content generation should provide variety: different text lengths, random date assignments, conditional urgency flags, optional labels with various types, optional milestones with different values, and subtasks that can be absent or contain 1-20 items with random completion states.

The system must include a content generation interface: a script or button that regenerates the entire board with configurable parameters (number of columns, total number of cards, distribution settings). Each regeneration should produce a new random dataset while maintaining the specified constraints. The interface should allow adjusting generation parameters and instantly seeing a new board layout with different content distribution.

## Implementation Stages

### Stage 1: Data Structure Refactoring
**Goal:** Separate columns and cards data into configurable structure.

**Tasks:**
- Create `data/columns.js` with column configurations (id, name, color)
- Create `data/board.js` with board configuration (columns array, cards array with columnId)
- Update `main.js` to read from new structure
- Ensure existing 3 cards still display correctly

**Visual Check:** Page shows same single column with 3 cards as before.

### Stage 2: Multiple Columns Rendering
**Goal:** Support rendering multiple columns side by side.

**Tasks:**
- Update `main.js` to iterate through columns array
- Filter cards by columnId for each column
- Update CSS for horizontal layout (flexbox/grid)
- Add spacing between columns

**Visual Check:** Page shows 2-3 columns side by side, each with its cards.

### Stage 3: Column Header Colors
**Goal:** Apply different background colors to column headers.

**Tasks:**
- Add color tokens for column header backgrounds (light shades)
- Update `ColumnHeader.js` to accept and apply color prop
- Update CSS to use color from column config
- Test with 3-4 columns with different colors

**Visual Check:** Each column header has distinct light background color.

### Stage 4: Content Generator - Basic Structure
**Goal:** Create data generator functions for cards.

**Tasks:**
- Create `generators/cardGenerator.js` with functions for:
  - Random titles (10-100 chars, English)
  - Random dates with optional urgency
  - Random labels (optional, various types)
  - Random milestones (optional, different values)
  - Random subtasks (0-20 items, random completion)
- Create `generators/boardGenerator.js` for full board generation
- Add configuration for generation parameters

**Visual Check:** Can import and call generator, get valid card/board data structure.

### Stage 5: Content Generator - Integration
**Goal:** Connect generator to UI with regeneration button.

**Tasks:**
- Add "Regenerate" button to page
- On click, generate new board data and re-render
- Add loading state during generation
- Ensure smooth transition between old and new data

**Visual Check:** Clicking button generates new board with different cards instantly.

### Stage 6: Generation Parameters UI
**Goal:** Add controls for customizing generation parameters.

**Tasks:**
- Add input fields for: number of columns, total cards, distribution
- Create parameter panel (can be collapsible)
- Update generator to use custom parameters
- Add "Generate" button that uses current parameters

**Visual Check:** Can adjust parameters and generate boards with different configurations.

