import { NextRequest, NextResponse } from 'next/server';
import { fetchTemplates } from '../../lib/data';
import { Template } from '../../data/types';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// GET - Fetch all templates
export async function GET() {
  try {
    const templates = await fetchTemplates();
    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

// POST - Create a new template
export async function POST(request: NextRequest) {
  try {
    const newTemplate: Template = await request.json();
    
    // Insert into database
    const result = await sql`
      INSERT INTO templates (id, name, category, content)
      VALUES (${newTemplate.id}, ${newTemplate.name}, ${newTemplate.category}, ${newTemplate.content})
      RETURNING *
    `;
    
    return NextResponse.json({ success: true, template: result[0] });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}

// PUT - Update a template
export async function PUT(request: NextRequest) {
  try {
    const updatedTemplate: Template = await request.json();
    
    // Update in database
    const result = await sql`
      UPDATE templates 
      SET name = ${updatedTemplate.name}, 
          category = ${updatedTemplate.category}, 
          content = ${updatedTemplate.content}
      WHERE id = ${updatedTemplate.id}
      RETURNING *
    `;
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, template: result[0] });
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
  }
}

// DELETE - Delete a template
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Template ID is required' }, { status: 400 });
    }
    
    // Delete from database
    const result = await sql`
      DELETE FROM templates WHERE id = ${parseInt(id)}
      RETURNING *
    `;
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, template: result[0] });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
  }
}