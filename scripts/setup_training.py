#!/usr/bin/env python3
"""
Divine Wisdom - Training Setup Script
Sets up the complete training environment
"""

import os
import json
import subprocess
import sys
from pathlib import Path

def setup_directories():
    """Create necessary directories"""
    directories = [
        "data/raw/bhagavad_gita",
        "data/raw/psychology_papers", 
        "data/processed/gita",
        "data/processed/psychology",
        "models/divine-wisdom",
        "logs",
        "results"
    ]
    
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✅ Created directory: {directory}")

def install_requirements():
    """Install required packages"""
    print("📦 Installing requirements...")
    
    try:
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", "-r", "requirements.txt"
        ])
        print("✅ Requirements installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install requirements: {e}")
        return False
    
    return True

def create_env_template():
    """Create environment variable template"""
    env_template = """# Divine Wisdom Training Environment Variables

# OpenAI API Key (required for fine-tuning)
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Organization ID
OPENAI_ORG_ID=your_org_id_here

# Data paths
GITA_DATA_PATH=data/raw/bhagavad_gita/gita.json
PSYCHOLOGY_DATA_PATH=data/raw/psychology_papers/

# Model configuration
MODEL_NAME=gpt-3.5-turbo-0125
MAX_TRAINING_EXAMPLES=2000
GITA_WEIGHT=0.6
PSYCHOLOGY_WEIGHT=0.4

# Output
MODEL_OUTPUT_NAME=divine-wisdom-v1
"""
    
    env_file = Path(".env")
    if not env_file.exists():
        with open(env_file, 'w') as f:
            f.write(env_template)
        print("✅ Created .env template file")
        print("🔑 Please edit .env and add your OpenAI API key")
    else:
        print("⚠️  .env file already exists")

def create_sample_data_formats():
    """Create sample data format examples"""
    
    # Sample Gita format
    sample_gita = {
        "title": "Bhagavad Gita",
        "chapters": [
            {
                "number": 2,
                "title": "Sankhya Yoga",
                "verses": [
                    {
                        "number": 47,
                        "sanskrit": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
                        "transliteration": "karmaṇy-evādhikāras te mā phaleṣhu kadāchana mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
                        "translation": "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
                        "commentary": "This verse teaches the principle of Nishkama Karma (desireless action). It emphasizes performing one's duty without attachment to results, which leads to spiritual growth and peace of mind.",
                        "themes": ["duty", "detachment", "action", "karma yoga"]
                    }
                ]
            }
        ]
    }
    
    sample_file = Path("data/raw/bhagavad_gita/sample_format.json")
    with open(sample_file, 'w', encoding='utf-8') as f:
        json.dump(sample_gita, f, ensure_ascii=False, indent=2)
    
    print("✅ Created sample Gita data format")
    
    # Sample psychology paper guidelines
    psych_guidelines = """
# Psychology Papers - Supported Formats

## 1. PDF Files (.pdf)
- Research papers in PDF format
- Will extract text automatically
- Best for published research papers

## 2. Word Documents (.docx)
- Research papers in Word format
- Extracts text and formatting
- Good for drafts and working papers

## 3. Text Files (.txt)
- Plain text format
- Should contain title, abstract, and main content
- Simplest format for processing

## File Naming Convention
Use descriptive names that indicate the research area:
- cognitive_behavioral_therapy_anxiety.pdf
- mindfulness_meditation_research.docx
- attachment_theory_relationships.txt

## Content Requirements
Each paper should ideally contain:
- Title
- Abstract/Summary
- Key findings
- Methodology
- Practical applications
- References (if available)

## Example Directory Structure:
data/raw/psychology_papers/
├── cognitive/
│   ├── cbt_anxiety_treatment.pdf
│   └── cognitive_reframing_study.docx
├─�� mindfulness/
│   ├── mindfulness_stress_reduction.pdf
│   └── meditation_brain_changes.txt
└── positive_psychology/
    ├── flow_state_research.pdf
    └── character_strengths_study.docx
"""
    
    guidelines_file = Path("data/raw/psychology_papers/README.md")
    with open(guidelines_file, 'w') as f:
        f.write(psych_guidelines)
    
    print("✅ Created psychology papers guidelines")

def create_training_scripts():
    """Create convenient training scripts"""
    
    # Data processing script
    process_script = """#!/bin/bash
# Divine Wisdom - Data Processing Script

echo "🕉️  Divine Wisdom - Data Processing"
echo "=================================="

# Load environment variables
source .env 2>/dev/null || echo "Warning: .env file not found"

# Process Gita data
echo "📖 Processing Bhagavad Gita data..."
python data-processing/gita-processor.py

# Process Psychology data  
echo "🧠 Processing Psychology papers..."
python data-processing/psychology-processor.py

# Combine and prepare for training
echo "🚀 Preparing training data..."
python training/divine-wisdom-trainer.py

echo "✅ Data processing complete!"
"""
    
    script_file = Path("scripts/process_data.sh")
    with open(script_file, 'w') as f:
        f.write(process_script)
    
    # Make executable
    os.chmod(script_file, 0o755)
    
    print("✅ Created data processing script")

def run_initial_checks():
    """Run initial environment checks"""
    print("\n🔍 Running initial checks...")
    
    # Check Python version
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ is required")
        return False
    else:
        print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detected")
    
    # Check if OpenAI API key is set
    if os.getenv('OPENAI_API_KEY'):
        print("✅ OpenAI API key found")
    else:
        print("⚠️  OpenAI API key not set (required for training)")
    
    return True

def print_next_steps():
    """Print next steps for the user"""
    print("\n" + "="*50)
    print("🎉 Setup Complete! Next Steps:")
    print("="*50)
    
    steps = [
        "1. 🔑 Edit .env file and add your OpenAI API key",
        "2. 📚 Add your Bhagavad Gita data to data/raw/bhagavad_gita/",
        "3. 📄 Add psychology papers to data/raw/psychology_papers/",
        "4. 🏃 Run: python data-processing/gita-processor.py",
        "5. 🏃 Run: python data-processing/psychology-processor.py", 
        "6. 🚀 Run: python training/divine-wisdom-trainer.py",
        "7. ⏳ Wait for fine-tuning to complete (can take hours)",
        "8. 🧪 Test your trained model!"
    ]
    
    for step in steps:
        print(f"   {step}")
    
    print("\n📖 For detailed instructions, see:")
    print("   - data/raw/bhagavad_gita/sample_format.json")
    print("   - data/raw/psychology_papers/README.md")
    
    print("\n✨ Happy training!")

def main():
    """Main setup function"""
    print("🕉️  Divine Wisdom - Training Setup")
    print("=" * 50)
    
    # Run checks
    if not run_initial_checks():
        print("❌ Setup failed due to requirement issues")
        return
    
    # Setup directories
    print("\n📁 Setting up directories...")
    setup_directories()
    
    # Install requirements
    print("\n📦 Installing requirements...")
    if not install_requirements():
        print("❌ Setup failed during package installation")
        return
    
    # Create environment template
    print("\n🔧 Creating configuration files...")
    create_env_template()
    
    # Create sample data formats
    print("\n📄 Creating sample data formats...")
    create_sample_data_formats()
    
    # Create training scripts
    print("\n📝 Creating training scripts...")
    create_training_scripts()
    
    # Print next steps
    print_next_steps()

if __name__ == "__main__":
    main()
