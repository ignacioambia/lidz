import { Test, TestingModule } from '@nestjs/testing';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent-instructions.dto';
import { Types } from 'mongoose';

jest.mock('nanoid', () => ({
  nanoid: () => 'mocked-id',
}));

describe('AgentsController', () => {
  let controller: AgentsController;

  const mockAgentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentsController],
      providers: [
        {
          provide: AgentsService,
          useValue: mockAgentsService,
        },
      ],
    }).compile();

    controller = module.get<AgentsController>(AgentsController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an agent', async () => {
      const createAgentDto: CreateAgentDto = {
        instructions: 'Test instructions',
      };
      const expectedResult = { agentId: 'test-agent-id' };

      mockAgentsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createAgentDto);

      expect(result).toEqual(expectedResult);
      expect(mockAgentsService.create).toHaveBeenCalledWith(
        createAgentDto,
        expect.any(Types.ObjectId),
      );
    });
  });

  describe('findAll', () => {
    it('should return all agents', () => {
      const expectedResult = 'This action returns all agents';
      mockAgentsService.findAll.mockReturnValue(expectedResult);

      const result = controller.findAll();

      expect(result).toBe(expectedResult);
      expect(mockAgentsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return one agent', () => {
      const id = '1';
      const expectedResult = 'This action returns a #1 agent';
      mockAgentsService.findOne.mockReturnValue(expectedResult);

      const result = controller.findOne(id);

      expect(result).toBe(expectedResult);
      expect(mockAgentsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update an agent', () => {
      const id = '1';
      const updateAgentDto: UpdateAgentDto = {
        instructions: 'Updated instructions',
      };
      const expectedResult = 'This action updates a #1 agent';
      mockAgentsService.update.mockReturnValue(expectedResult);

      const result = controller.update(id, updateAgentDto);

      expect(result).toBe(expectedResult);
      expect(mockAgentsService.update).toHaveBeenCalledWith(1, updateAgentDto);
    });
  });

  describe('remove', () => {
    it('should remove an agent', () => {
      const id = '1';
      const expectedResult = 'This action removes a #1 agent';
      mockAgentsService.remove.mockReturnValue(expectedResult);

      const result = controller.remove(id);

      expect(result).toBe(expectedResult);
      expect(mockAgentsService.remove).toHaveBeenCalledWith(1);
    });
  });
});
