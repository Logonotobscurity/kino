import { NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { 
  exportContactSubmissionsToSheet, 
  exportBookingsToSheet, 
  exportPaymentsToSheet,
  exportClassRegistrationsToSheet
} from '@/app/lib/api/sheet-export';

// Define a type for export results
type ExportResult = {
  success: boolean;
  message?: string;
  error?: any;
};

// This endpoint can be scheduled to run via a cron job service
// e.g., with Vercel Cron Jobs or external service like GitHub Actions
export async function GET(request: Request) {
  // Verify authorization token to ensure this is a legitimate cron request
  const authHeader = request.headers.get('authorization');
  const expectedToken = process.env.CRON_SECRET_TOKEN;
  
  if (!expectedToken) {
    console.error('CRON_SECRET_TOKEN is not configured');
    return NextResponse.json(
      { success: false, error: 'Cron secret token is not configured' },
      { status: 500 }
    );
  }
  
  if (authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    // Log the start of the export process
    const supabase = createClient();
    await supabase
      .from('spreadsheet_exports')
      .insert({
        export_type: 'batch',
        sheet_id: 'N/A',
        rows_exported: 0,
        status: 'pending',
      });
    
    // Run all export jobs in parallel
    const [contactResults, bookingResults, paymentResults, classResults] = await Promise.all([
      exportContactSubmissionsToSheet().catch(err => ({ success: false, error: err } as ExportResult)),
      exportBookingsToSheet().catch(err => ({ success: false, error: err } as ExportResult)),
      exportPaymentsToSheet().catch(err => ({ success: false, error: err } as ExportResult)),
      exportClassRegistrationsToSheet().catch(err => ({ success: false, error: err } as ExportResult))
    ]);
    
    // Helper function to safely extract numbers from result messages
    const getExportedCount = (result: ExportResult): number => {
      if (!result.success || !result.message) return 0;
      const match = result.message.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    };
    
    // Compile results
    const results = {
      contacts: contactResults,
      bookings: bookingResults,
      payments: paymentResults,
      classes: classResults,
      timestamp: new Date().toISOString()
    };
    
    // Calculate total exported rows
    const totalExported = 
      getExportedCount(contactResults) +
      getExportedCount(bookingResults) +
      getExportedCount(paymentResults) +
      getExportedCount(classResults);
    
    // Update the batch export record
    await supabase
      .from('spreadsheet_exports')
      .update({
        status: 'completed',
        rows_exported: totalExported,
        completed_at: new Date().toISOString(),
      })
      .eq('export_type', 'batch')
      .is('completed_at', null);
    
    return NextResponse.json({ success: true, results, totalExported }, { status: 200 });
  } catch (error) {
    console.error('Error running spreadsheet exports:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Unknown error' },
      { status: 500 }
    );
  }
} 