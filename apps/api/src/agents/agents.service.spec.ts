import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { AgentsService } from './agents.service';
import { Agent } from '../schemas/agent.schema';
import { CreateAgentDto } from './dto/create-agent.dto';

jest.mock('nanoid', () => ({
  nanoid: () => 'mocked-id',
}));

describe('AgentsService', () => {
  let service: AgentsService;

  const mockAgent = {
    agentId: 'test-agent-id',
    agentName: 'Test Agent',
    instructions: 'Test instructions',
    providerId: new Types.ObjectId(),
    isActive: true,
    createdAt: new Date(),
  };

  const mockAgentModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentsService,
        {
          provide: getModelToken(Agent.name),
          useValue: mockAgentModel,
        },
      ],
    }).compile();

    service = module.get<AgentsService>(AgentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an agent', async () => {
      const createAgentDto: CreateAgentDto = {
        instructions: 'Test instructions',
      };
      const providerId = new Types.ObjectId();

      mockAgentModel.create.mockResolvedValue(mockAgent);

      const result = await service.create(createAgentDto, providerId);

      expect(result).toEqual({ agentId: mockAgent.agentId });
      expect(mockAgentModel.create).toHaveBeenCalledWith({
        ...createAgentDto,
        providerId,
      });
    });
  });

  describe('findAll', () => {
    it('should return a string', () => {
      const result = service.findAll();
      expect(result).toBe('This action returns all agents');
    });
  });

  describe('findOne', () => {
    it('should return a string with the id', () => {
      const id = 1;
      const result = service.findOne(id);
      expect(result).toBe(`This action returns a #${id} agent`);
    });
  });

  describe('update', () => {
    it('should return a string with the id', () => {
      const id = 1;
      const updateAgentDto = { instructions: 'Updated instructions' };
      const result = service.update(id, updateAgentDto);
      expect(result).toBe(`This action updates a #${id} agent`);
    });
  });

  describe('remove', () => {
    it('should return a string with the id', () => {
      const id = 1;
      const result = service.remove(id);
      expect(result).toBe(`This action removes a #${id} agent`);
    });
  });
});
