// src/app/api/debug-n8n/route.js
import { NextResponse } from "next/server";

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    platform: 'vercel'
  };

  try {
    // 1. Check environment variables
    debugInfo.envCheck = {
      N8N_WEBHOOK_URL: !!process.env.N8N_WEBHOOK_URL,
      N8N_WEBHOOK_URL_length: process.env.N8N_WEBHOOK_URL?.length || 0,
      N8N_WEBHOOK_URL_preview: process.env.N8N_WEBHOOK_URL?.substring(0, 50) + '...' || 'NOT_SET'
    };

    // 2. Basic connectivity test
    if (!process.env.N8N_WEBHOOK_URL) {
      debugInfo.connectionTest = {
        status: 'skipped',
        reason: 'N8N_WEBHOOK_URL not configured'
      };
    } else {
      try {
        console.log("Testing N8N connection to:", process.env.N8N_WEBHOOK_URL);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
        
        const startTime = Date.now();
        
        const response = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mobarrez-Debug/1.0',
          },
          body: JSON.stringify({
            message: "Debug connectivity test",
            userId: "debug-user",
            sessionId: "debug-session",
            userContext: {
              name: "Debug User",
              email: "debug@test.com"
            },
            companyInfo: {
              name: "Mobarrez",
              domain: "web development, branding, marketing"
            },
            isDebugTest: true,
            timestamp: new Date().toISOString()
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        const responseTime = Date.now() - startTime;
        
        debugInfo.connectionTest = {
          status: 'completed',
          httpStatus: response.status,
          responseTime: `${responseTime}ms`,
          headers: Object.fromEntries(response.headers.entries()),
          url: process.env.N8N_WEBHOOK_URL
        };

        // Try to read response
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const jsonResponse = await response.json();
            debugInfo.connectionTest.responsePreview = JSON.stringify(jsonResponse).substring(0, 200);
            debugInfo.connectionTest.responseType = 'json';
          } else {
            const textResponse = await response.text();
            debugInfo.connectionTest.responsePreview = textResponse.substring(0, 200);
            debugInfo.connectionTest.responseType = 'text';
          }
        } catch (readError) {
          debugInfo.connectionTest.responseReadError = readError.message;
        }

      } catch (fetchError) {
        debugInfo.connectionTest = {
          status: 'failed',
          error: fetchError.message,
          errorName: fetchError.name,
          url: process.env.N8N_WEBHOOK_URL
        };

        // Specific error analysis
        if (fetchError.name === 'AbortError') {
          debugInfo.connectionTest.analysis = 'Request timed out - N8N may be slow or unresponsive';
        } else if (fetchError.message.includes('ENOTFOUND')) {
          debugInfo.connectionTest.analysis = 'DNS resolution failed - check if the N8N URL is correct';
        } else if (fetchError.message.includes('ECONNREFUSED')) {
          debugInfo.connectionTest.analysis = 'Connection refused - N8N service may be down or URL incorrect';
        } else if (fetchError.message.includes('certificate')) {
          debugInfo.connectionTest.analysis = 'SSL certificate issue - check HTTPS configuration';
        }
      }
    }

    // 3. URL validation
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        const url = new URL(process.env.N8N_WEBHOOK_URL);
        debugInfo.urlValidation = {
          valid: true,
          protocol: url.protocol,
          hostname: url.hostname,
          port: url.port || 'default',
          pathname: url.pathname
        };
      } catch (urlError) {
        debugInfo.urlValidation = {
          valid: false,
          error: urlError.message
        };
      }
    }

    // 4. Network information (Vercel-specific)
    debugInfo.networkInfo = {
      userAgent: 'Mobarrez-Debug/1.0',
      platform: process.platform,
      nodeVersion: process.version,
      vercelRegion: process.env.VERCEL_REGION || 'unknown',
      vercelUrl: process.env.VERCEL_URL || 'not available'
    };

    return NextResponse.json({
      success: true,
      debug: debugInfo
    });

  } catch (error) {
    console.error("Debug N8N error:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : 'Hidden in production',
        name: error.name
      },
      debug: debugInfo
    }, { status: 500 });
  }
}

// POST method for testing with custom payload
export async function POST(request) {
  try {
    const body = await request.json();
    const { testMessage = "Custom debug test" } = body;

    if (!process.env.N8N_WEBHOOK_URL) {
      return NextResponse.json({
        success: false,
        error: "N8N_WEBHOOK_URL not configured"
      }, { status: 400 });
    }

    const startTime = Date.now();
    
    const response = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mobarrez-CustomDebug/1.0',
      },
      body: JSON.stringify({
        message: testMessage,
        userId: "debug-custom-user",
        sessionId: "debug-custom-session",
        userContext: {
          name: "Custom Debug User",
          email: "custom@debug.com"
        },
        companyInfo: {
          name: "Mobarrez",
          domain: "web development, branding, marketing"
        },
        isCustomDebugTest: true,
        timestamp: new Date().toISOString()
      })
    });

    const responseTime = Date.now() - startTime;
    
    let responseData;
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
    } catch (e) {
      responseData = 'Could not read response body';
    }

    return NextResponse.json({
      success: response.ok,
      httpStatus: response.status,
      responseTime: `${responseTime}ms`,
      headers: Object.fromEntries(response.headers.entries()),
      data: responseData,
      url: process.env.N8N_WEBHOOK_URL
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      name: error.name
    }, { status: 500 });
  }
}