'use server';

import { Template } from '../data/types';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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
        
        console.log('Template created successfully');
        
        // Revalidate the home page to remove the deleted template
        revalidatePath('/');
        
        return {
            message: 'Template created successfully',
            success: true,
            template: result[0]
        };
    } catch (error) {
        console.error('Failed to create template:', error);
        return {
            message: 'Failed to create template',
            success: false
        };
    }
}

export async function editTemplate(templateId: number, updatedData: { name: string; content: string; category?: string }) {
    try {
        // Check if database connection is available
        if (!process.env.POSTGRES_URL) {
            console.warn('Database URL not configured, using fallback mode');
            return {
                message: 'Template updated (fallback mode - no database)',
                success: true,
                template: {
                    id: templateId,
                    name: updatedData.name,
                    category: updatedData.category || 'General',
                    content: updatedData.content
                }
            };
        }

        const result = await sql<Template[]>`
            UPDATE templates 
            SET name = ${updatedData.name}, 
                content = ${updatedData.content},
                category = ${updatedData.category || 'General'}
            WHERE id = ${templateId}
            RETURNING id, name, category, content
        `;
        
        if (result.length === 0) {
            return {
                message: 'Template not found',
                success: false
            };
        }

        console.log('Template updated successfully');
        
        // Revalidate the home page to show the updated template
        revalidatePath('/');
        
        return {
            message: 'Template updated successfully',
            success: true,
            template: result[0]
        };
    } catch (error) {
        console.error('Failed to update template:', error);
        return {
            message: 'Failed to update template',
            success: false
        };
    }
}

export async function deleteTemplate(templateId: number) {
    try {
        // Check if database connection is available
        if (!process.env.POSTGRES_URL) {
            console.warn('Database URL not configured, using fallback mode');
            return {
                message: 'Template deleted (fallback mode - no database)',
                success: true,
                templateId: templateId
            };
        }

        const result = await sql<Template[]>`
            DELETE FROM templates 
            WHERE id = ${templateId}
            RETURNING id, name, category, content
        `;
        
        if (result.length === 0) {
            return {
                message: 'Template not found',
                success: false
            };
        }

        console.log('Template deleted successfully');

        return {
            message: 'Template deleted successfully',
            success: true,
            templateId: templateId
        };
    } catch (error) {
        console.error('Failed to delete template:', error);
        return {
            message: 'Failed to delete template',
            success: false
        };
    }
}