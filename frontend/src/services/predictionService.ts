import { api } from '@/lib/api';

export interface ModelScore {
    name: string;
    prediction: 'Real' | 'Fake';
    score: number;
    confidence: number;
}

export interface PredictionResponse {
    model: string;
    prediction: 'Real' | 'Fake';
    score: number;
    confidence: number;
    individualModels?: ModelScore[];
}

export const predictionService = {
    predict: async (file: File, modelName: string): Promise<PredictionResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('model_name', modelName);

        const response = await api.post<any>('/prediction/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Extract ensemble prediction and individual models
        const data = response.data;
        const individualModels: ModelScore[] = [];

        if (data.individual_models) {
            Object.entries(data.individual_models).forEach(([modelName, modelData]: [string, any]) => {
                individualModels.push({
                    name: modelName,
                    prediction: modelData.prediction || 'Real',
                    score: modelData.score || 0,
                    confidence: modelData.confidence || 0
                });
            });
        }

        return {
            model: data.model || 'Ensemble',
            prediction: data.ensemble?.prediction || 'Real',
            score: data.ensemble?.score || 0,
            confidence: data.ensemble?.confidence || 0,
            individualModels
        };
    }
};
