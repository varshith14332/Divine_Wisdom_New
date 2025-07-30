# 🕉️ Divine Wisdom - AI Training Pipeline

This directory contains everything needed to train your own Divine Wisdom AI model using the 700 verses of the Bhagavad Gita and psychology research papers.

## 📋 Overview

The training pipeline consists of three main components:

1. **Data Processing** - Convert your raw data into training format
2. **Training Pipeline** - Fine-tune AI models with combined wisdom
3. **Integration** - Connect trained models to your Divine Wisdom app

## 🚀 Quick Start

### 1. Setup Environment
```bash
# Run the setup script
python setup_training.py

# Edit .env file with your OpenAI API key
nano .env
```

### 2. Prepare Your Data

**Bhagavad Gita Data:**
- Put your Gita data in `data/raw/bhagavad_gita/`
- Supported formats: JSON, YAML, CSV, or plain text
- See `data/raw/bhagavad_gita/sample_format.json` for structure

**Psychology Papers:**
- Put research papers in `data/raw/psychology_papers/`
- Supported formats: PDF, DOCX, TXT
- See `data/raw/psychology_papers/README.md` for guidelines

### 3. Process Data
```bash
# Process Gita verses
python data-processing/gita-processor.py

# Process psychology papers
python data-processing/psychology-processor.py
```

### 4. Train the Model
```bash
# Start training pipeline
python training/divine-wisdom-trainer.py
```

### 5. Monitor Training
```bash
# Check training status (replace JOB_ID with your job ID)
python -c "
from training.divine_wisdom_trainer import *
trainer = DivineWisdomTrainer(TrainingConfig())
print(trainer.check_fine_tune_status('JOB_ID'))
"
```

## 📁 Directory Structure

```
scripts/
├── data-processing/
│   ├── gita-processor.py          # Process Bhagavad Gita data
│   └── psychology-processor.py    # Process psychology papers
├── training/
│   └── divine-wisdom-trainer.py   # Main training pipeline
├── data/
│   ├── raw/                       # Your input data
│   │   ├── bhagavad_gita/        # Gita verses
│   │   └── psychology_papers/     # Research papers
│   └── processed/                 # Processed training data
│       ├── gita/                 # Processed Gita data
│       └── psychology/           # Processed psychology data
├── models/
│   └── divine-wisdom/            # Trained models and metadata
├── requirements.txt              # Python dependencies
├── setup_training.py            # Setup script
└── README.md                    # This file
```

## 📚 Data Formats

### Bhagavad Gita Format

The Gita processor supports multiple input formats:

**JSON Format (Recommended):**
```json
{
  "title": "Bhagavad Gita",
  "chapters": [
    {
      "number": 2,
      "title": "Sankhya Yoga", 
      "verses": [
        {
          "number": 47,
          "sanskrit": "कर्मण्येवाधिकारस्ते...",
          "transliteration": "karmaṇy-evādhikāras te...",
          "translation": "You have a right to perform...",
          "commentary": "This verse teaches...",
          "themes": ["duty", "detachment", "action"]
        }
      ]
    }
  ]
}
```

**CSV Format:**
```csv
chapter,verse,sanskrit,transliteration,translation,commentary,themes
2,47,"कर्मण्येवाधिकारस्ते...","karmaṇy-evādhikāras te...","You have a right...","This verse teaches...","duty,detachment,action"
```

### Psychology Papers

**Supported Formats:**
- **PDF**: Research papers, journal articles
- **DOCX**: Word documents, drafts
- **TXT**: Plain text format

**Content Requirements:**
- Title and abstract
- Key findings or conclusions
- Methodology (if available)
- Practical applications

## 🎯 Training Configuration

Configure training in `training/divine-wisdom-trainer.py`:

```python
config = TrainingConfig(
    model_name="gpt-3.5-turbo-0125",  # Base model
    max_training_examples=2000,        # Total examples
    gita_weight=0.6,                  # 60% Gita content
    psychology_weight=0.4,            # 40% Psychology content
    output_model_name="divine-wisdom-v1"
)
```

## 🧠 What the AI Learns

The training creates three types of examples:

### 1. Direct Knowledge
- **Gita Verses**: Direct explanations of verses and their meanings
- **Psychology Concepts**: Explanations of psychological principles

### 2. Practical Applications
- **Life Situations**: How to apply wisdom to real problems
- **Therapeutic Applications**: Practical psychological interventions

### 3. Integration Examples
- **Combined Wisdom**: Responses that blend both traditions
- **Cross-References**: How ancient wisdom aligns with modern science

## 📊 Training Process

### Phase 1: Data Processing
1. **Text Extraction**: Extract text from various file formats
2. **Content Analysis**: Identify themes, concepts, and connections
3. **Training Examples**: Generate question-answer pairs
4. **Quality Control**: Filter and validate examples

### Phase 2: Fine-Tuning
1. **Data Preparation**: Format examples for OpenAI fine-tuning
2. **Upload**: Send training data to OpenAI
3. **Training**: Fine-tune the base model (takes 1-6 hours)
4. **Validation**: Test the trained model

### Phase 3: Integration
1. **API Integration**: Connect trained model to your app
2. **Testing**: Validate responses across different scenarios
3. **Deployment**: Replace mock responses with real AI

## 🔧 Integration with Divine Wisdom App

Once training is complete, update your app:

### 1. Update API Service
```typescript
// client/services/wisdom-api.ts
const FINE_TUNED_MODEL = "ft:gpt-3.5-turbo:your-org:divine-wisdom-v1:abc123"

async sendMessage(message: string): Promise<WisdomResponse> {
  const response = await this.openai.chat.completions.create({
    model: FINE_TUNED_MODEL, // Use your trained model
    messages: [
      {
        role: "system",
        content: "You are Divine Wisdom AI..."
      },
      {
        role: "user", 
        content: message
      }
    ]
  })
  
  return this.parseResponse(response)
}
```

### 2. Update Chat Component
```typescript
// Replace mock responses in client/pages/Chat.tsx
const handleSendMessage = async () => {
  // Remove setTimeout mock, use real API
  const response = await wisdomAPI.sendMessage(inputValue)
  
  const assistantMessage: Message = {
    id: Date.now().toString(),
    type: "assistant",
    content: response.content,
    timestamp: new Date(),
    source: response.sources[0]?.type || "general"
  }
  
  setMessages(prev => [...prev, assistantMessage])
}
```

## 🧪 Testing Your Model

### Test Prompts
```python
test_prompts = [
    "I'm feeling anxious about my future. Can you help me find peace?",
    "How can I find my life purpose according to both ancient wisdom and modern psychology?",
    "I'm struggling with letting go of past mistakes. What guidance can you offer?",
    "How do I balance worldly responsibilities with spiritual growth?",
    "I'm having trouble with difficult relationships. What should I do?"
]
```

### Quality Metrics
- **Relevance**: Does the response address the question?
- **Integration**: Does it blend both traditions appropriately?
- **Practicality**: Are suggestions actionable?
- **Compassion**: Is the tone empathetic and supportive?

## 💰 Cost Estimation

**OpenAI Fine-Tuning Costs** (approximate):
- Training: $0.008 per 1K tokens
- Usage: $0.012 per 1K tokens (input) + $0.016 per 1K tokens (output)

**For 2,000 training examples** (~1M tokens):
- Training cost: ~$8-15
- Monthly usage (1,000 conversations): ~$30-50

## 🔒 Privacy & Ethics

### Data Privacy
- Your training data stays within OpenAI's secure environment
- Trained models are private to your organization
- No data is shared with other users

### Ethical Considerations
- Ensure accurate representation of Gita teachings
- Include disclaimers about AI limitations
- Encourage users to seek professional help for serious issues
- Respect cultural and religious sensitivities

## 🐛 Troubleshooting

### Common Issues

**"No API key found"**
```bash
# Set your OpenAI API key
export OPENAI_API_KEY="sk-your-key-here"
# Or add to .env file
```

**"Not enough training data"**
- Need at least 10 training examples
- Recommended: 100+ examples for good performance
- 1,000+ examples for production quality

**"Training failed"**
- Check data format (must be valid JSONL)
- Ensure examples have both prompt and completion
- Verify API key has fine-tuning permissions

**"Model responses are generic"**
- Add more specific training examples
- Include more diverse scenarios
- Increase training data quality

### Getting Help

1. Check the [OpenAI Fine-tuning Guide](https://platform.openai.com/docs/guides/fine-tuning)
2. Review training logs in `models/divine-wisdom/`
3. Test with simpler prompts first
4. Gradually increase complexity

## 🎉 Next Steps

Once your model is trained:

1. **Integrate** with your Divine Wisdom app
2. **Test** thoroughly with diverse prompts
3. **Monitor** usage and performance
4. **Iterate** with additional training data
5. **Scale** to serve your users

## 📞 Support

For technical issues:
- Check the troubleshooting section above
- Review OpenAI documentation
- Ensure your data format matches examples

Remember: Training AI is an iterative process. Start with good data, test thoroughly, and continuously improve based on user feedback.

**Happy training! 🕉️✨**
