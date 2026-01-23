import { Weight, Ruler, Settings, Wrench, Fuel, Zap } from 'lucide-react';

export const SPEC_TEMPLATES = {
    operating_weight: {
        label: 'Operating Weight',
        icon: Weight
    },
    bucket_capacity: {
        label: 'Bucket Capacity',
        icon: Settings
    },
    max_digging_depth: {
        label: 'Max Digging Depth',
        icon: Ruler
    },
    fuel_efficiency: {
        label: 'High Fuel Efficiency',
        icon: Settings
    },
    digging_force: {
        label: 'Strong Digging Force',
        icon: Wrench
    },
    boom_arm: {
        label: 'Heavy-Duty Boom & Arm',
        icon: Settings
    },
    stability: {
        label: 'High Stability',
        icon: Wrench
    },
    tail_swing: {
        label: 'Zero Tail Swing',
        icon: Settings
    },
    compact: {
        label: 'Compact & Maneuverable',
        icon: Ruler
    },
    engine_type: {
        label: 'CEV-V Compliant',
        icon: Settings
    },
    productivity: {
        label: 'High Productivity',
        icon: Wrench
    }
};

export const getSpecDetails = (type) => {
    return SPEC_TEMPLATES[type] || {
        label: type,
        icon: Settings 
    };
};