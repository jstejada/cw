require 'set'

class BatchItemProcessor

  def initialize
    reset
    should_process
  end

  def processed_items
    @processed_items
  end

  def identify(field)
    @id = field.to_sym
  end

  def should_process(&block)
    @should_process = lambda { |item|
      processed = @processed_ids.include? get_id(item)
      if block
        (not processed) and (block.call item)
      else
        not processed
      end
    }
  end

  def process_items(items)
    items.each do |item|
      if @should_process.call(item)
        @processed_ids.add get_id(item)
        @processed_items << item
        yield item
      end
    end
  end

  def reset
    @processed_ids = Set.new
    @processed_items = []
  end

  private

  def get_id(item)
    if @id
      if item.is_a? Hash
        item[@id.to_s] || item[@id]
      else
        item.send(@id)
      end
    else
      item
    end
  end

end
