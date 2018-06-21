# caution! this config file contains private API keys.
# ensure it remains in .gitignore regardless of file path
require_relative 'config'
require_relative 'Rule'

def final_orders_parser(file)
  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  lines.each_with_index do |line, idx|
    if line.include?("is amended.") || line.include?("is rescinded.")
      key_line = line
      jdx = idx

      until key_line.include?("CSR")
        jdx -= 1
        key_line = lines[jdx].gsub("\n", " ") + key_line
      end


      action = line.include?("amended") ? "Amend" : "Rescind"
      rule_citation, rule_description = key_line.match(/^(?<CODE>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\s+is #{action.downcase}ed.$)/).captures

      add_to_airtable(Rule.new(rule_citation, rule_description, action, "Final Order", file_name))
    end
  end

  puts "Final rules uploaded to Airtable."
end

def proposed_orders_parser(file)
  lines = File.open(file).to_a
  file_name = File.basename(file, ".txt")

  lines.each_with_index do |line, idx|
    if line.include?("PROPOSED AMENDMENT") || line.include?("PROPOSED RECISSION")
      jdx = idx + 1
      key_line = lines[jdx]

      until key_line.include?(". ")
        jdx += 1
        key_line = key_line.gsub("\n", " ") + lines[jdx]
      end

      action = line.include?("AMENDMENT") ? "Amend" : "Rescind"
      rule_citation, rule_description = key_line.match(/^(?<CHAPTER>\d+\s+CSR\s+[-.\d]+)\s+(?<DESCRIPTION>.*?)(?=\. .+$)/).captures

      add_to_airtable(Rule.new(rule_citation, rule_description, action, "Proposed (Formal)", file_name))
    end
  end

  puts "Proposed rules uploaded to Airtable."
end

def add_to_airtable(rule)
  airtableRule = AllSoSData.new(
    "Rule Citation" => rule.rule_citation,
    "Rule Description" => rule.rule_description,
    "Proposed Action" => rule.proposed_action,
    "Stage" => rule.stage,
    "Source" => rule.source,
    "date_added" => Time.now
  )

  airtableRule.create
end

final_orders_parser('./files/orders_test_excerpt.txt')
# proposed_orders_parser('./files/proposed_test_excerpt_short.txt')
