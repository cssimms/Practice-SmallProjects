
# genome is the entire genome, sequence is the gene sequence to find
def genome_incude(genome, squence)

end

def state_builder(sequence)

  sequence.chars.each_with_index do |base, index|
    node = StateNode.new(index)

    node.set_child(base, index + 1)

    ['A', 'G', 'C', 'T'].delete(base).each do |b|
      node.set_child(b, 0)
    end
  end
end

class StateNode

  attr_accessor :key, :A, :G, :C, :T

  def initialize(key)
    @key = key
    @A = nil
    @G = nil
    @C = nil
    @T = nil
  end
end
