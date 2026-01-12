
import { Task } from "../types";

const MONDAY_API_URL = 'https://api.monday.com/v2';

// Updated to reflect the specific 6 Phases discussed in the Pioneer Service proposal
// Total Budget: $6,000 (33-33-33 split)
const MOCK_TASKS: Task[] = [
  { 
    id: '1', 
    name: 'Phase 1: Analysis & Planning (Discovery)', 
    status: 'Done', 
    date: '2024-11-15',
    payment: { amount: 2000, status: 'Paid' }
  },
  { 
    id: '2', 
    name: 'Phase 1: Competitor Research (Fuse/NextGen)', 
    status: 'Done', 
    date: '2024-11-18' 
  },
  { 
    id: '3', 
    name: 'Phase 2: Full Sitemap Architecture', 
    status: 'Done', 
    date: '2024-11-22' 
  },
  { 
    id: '4', 
    name: 'Phase 2: Wireframes (Unique Pages)', 
    status: 'In Review', 
    date: '2024-11-28' 
  },
  { 
    id: '5', 
    name: 'Phase 3: UX/UI Design (Figma)', 
    status: 'Not Started', 
    date: '2024-12-01',
    payment: { amount: 2000, status: 'Pending' }
  },
  { 
    id: '6', 
    name: 'Phase 4: React Native Frontend Dev', 
    status: 'Not Started', 
    date: '2025-01-05',
    payment: { amount: 2000, status: 'Pending' } 
  },
  { 
    id: '7', 
    name: 'Phase 5: Backend & CMS Integration', 
    status: 'Not Started', 
    date: '2025-01-25' 
  },
  { 
    id: '8', 
    name: 'Phase 6: QA Testing & Launch', 
    status: 'Not Started', 
    date: '2025-02-10' 
  },
];

export const fetchBoardTasks = async (boardId: string): Promise<Task[]> => {
  // In a real environment, this token should come from process.env.MONDAY_API_TOKEN
  const token = (typeof process !== 'undefined' && process.env) ? process.env.MONDAY_API_TOKEN : '';

  if (!token) {
    // console.warn("Monday API Token not found. Returning mock data.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_TASKS), 500));
  }

  const query = `
    query ($boardId: [ID!]) {
      boards(ids: $boardId) {
        items_page {
          items {
            id
            name
            column_values {
              id
              text
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(MONDAY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({ 
        query, 
        variables: { boardId: [boardId] } 
      }),
    });

    if (!response.ok) {
        throw new Error(`Monday API Error: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.errors) {
        throw new Error("GraphQL Error");
    }

    const items = data.data?.boards?.[0]?.items_page?.items || [];
    
    return items.map((item: any) => ({
      id: item.id,
      name: item.name,
      status: item.column_values.find((c: any) => c.text && (c.id.includes('status') || c.id === 'status'))?.text || 'Not Started',
      date: item.column_values.find((c: any) => c.text && (c.id.includes('date') || c.id === 'date4'))?.text || 'TBD',
      // Note: Payment parsing logic would go here if Monday column existed
    }));

  } catch (error) {
    console.error("Failed to fetch from Monday.com. Using mock data.");
    return MOCK_TASKS;
  }
};