import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';
import { Context } from 'hono';
import * as fs from 'fs';
import * as path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const predictMedia = catchAsync(async (c: Context) => {
    const body = await c.req.parseBody();
    const file = body['file'];
    const modelName = body['model_name'] as string;

    if (!file || !(file instanceof File)) {
        throw new ApiError(400, 'File is required');
    }

    // Save uploaded file temporarily
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const tempFilePath = path.join(uploadDir, `${Date.now()}_${file.name}`);
    const arrayBuffer = await file.arrayBuffer();
    fs.writeFileSync(tempFilePath, Buffer.from(arrayBuffer));

    // Use absolute path for Python
    const absolutePath = path.resolve(tempFilePath);
    console.log(`📁 File saved to: ${tempFilePath}`);
    console.log(`📍 Absolute path: ${absolutePath}`);

    try {
        // Use spawnSync to avoid cmd.exe issues - Direct Python execution
        console.log(`🔍 Running inference on: ${absolutePath}`);

        const pythonExe = process.env.PYTHON_EXE || 'C:\\Users\\shyam\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe';
        const inferenceScript = path.resolve(__dirname, '../../inference.py');

        const result = spawnSync(pythonExe, [inferenceScript, absolutePath, modelName || ''], {
            cwd: path.resolve(__dirname, '../..'),
            timeout: 300000,
            encoding: 'utf-8',
            maxBuffer: 10 * 1024 * 1024,
            stdio: ['pipe', 'pipe', 'pipe']
        });

        if (result.error) {
            console.error('❌ Spawn Error:', result.error);
            throw result.error;
        }

        if (result.status !== 0) {
            console.error('❌ Python exited with code:', result.status);
            console.error('stderr:', result.stderr);
            throw new Error(`Python failed: ${result.stderr}`);
        }

        const stdout = result.stdout || '';
        console.log('📊 Python output received');

        // Find JSON in output
        const jsonMatch = stdout.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error(`No valid JSON in output: ${stdout.slice(0, 500)}`);
        }

        const prediction = JSON.parse(jsonMatch[0]);

        // Cleanup temp file
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }

        return c.json({
            id: crypto.randomUUID(),
            model: modelName || 'Ensemble',
            ...prediction,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('🔥 Full Error:', error);

        // Cleanup on error
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }

        throw new ApiError(500, `Prediction failed: ${error instanceof Error ? error.message : String(error)}`);
    }
});
