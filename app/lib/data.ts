
import { Template } from '../data/types';
import postgres from 'postgres';
import { currentUser } from "@clerk/nextjs/server";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function fetchTemplates(): Promise<Template[]> {
  try {
    console.log('Fetching templates data...');
    // Check if database connection is available
    if (!process.env.POSTGRES_URL) {
      throw new Error('Database URL not configured');
    }

    const user = await currentUser();
    if (!user) {
      return []; // or handle unauthenticated case appropriately
    }
    const { id } = user;

    const data = await sql<Template[]>`
      SELECT id, name, content,
             COALESCE(category, 'General') as category, userid
      FROM templates
      WHERE userid = ${id}
      ORDER BY name
    `;

    console.log('Data fetch completed.');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch templates data.');
  }
}

// Add function to create templates table if it doesn't exist
export async function initializeDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS templates (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) DEFAULT 'General',
        content TEXT NOT NULL,
        userid VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export async function insertTemplate(prevState: any, formData: FormData) {
    try {
        // Check if database connection is available
        if (!process.env.POSTGRES_URL) {
            console.warn('Database URL not configured, skipping database insertion');
            return {
                message: 'Template created (fallback mode - no database)',
                success: true,
                template: {
                    id: Date.now(),
                    name: formData.get('name') as string || 'New Template',
                    category: formData.get('category') as string || 'General',
                    content: formData.get('content') as string || 'Enter content here...'
                }
            };
        }

        const name = formData.get('name') as string;
        const category = formData.get('category') as string || 'General';
        const content = formData.get('content') as string;

        if (!name || !content) {
            return {
                message: 'Name and content are required',
                success: false
            };
        }

        const result = await sql<Template[]>`
            INSERT INTO templates (name, category, content)
            VALUES (${name}, ${category}, ${content})
            RETURNING id, name, category, content
        `;
        
        console.log('Template inserted successfully');
        return {
            message: 'Template created successfully',
            success: true,
            template: result[0]
        };
    } catch (error) {
        console.error('Failed to insert template to the db', error);
        return {
            message: 'Failed to create template',
            success: false
        };
    }
}